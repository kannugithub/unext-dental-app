import React, { useEffect, useRef, useState } from "react";
import styles from "./StaffDetails.module.scss";
import Link from "next/link";
import { fetchSingleClinicStaff } from "@/app/store/slices/superAdminSlices";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import {
  addClinicStaff,
  fetchClinicsList,
  updateClinicStaff,
} from "@/app/store/slices/superAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ViewAdminStaffDetails = () => {
  const [selectKey, setSelectKey] = useState(Date.now());
  const clinicListData = useAppSelector((state) => state.admin.clinicListData);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const singleClinicStaffData = useAppSelector(
    (state) => state?.admin?.singleClinicStaffInfo
  );
  const [values, setValues] = useState({});

  const dispatch = useDispatch();
  const fetched = useRef(false);
  const router = useRouter();

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (singleClinicStaffData) {
      setSelectKey(Date.now());
    }
  }, [singleClinicStaffData]);

  const handleSelectChange = (selectedOptions) => {
    setValues({ ...values, officeName: selectedOptions });
  };

  const params = new URLSearchParams(window.location.search);
  const clinicStaffId = params.get("item");

  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchClinicsList());
      fetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (singleClinicStaffData) {
      setValues((prevValues) => ({
        ...prevValues,
        staffName: singleClinicStaffData?.data?.name,
        email: singleClinicStaffData?.data?.email,
        number: singleClinicStaffData?.data?.p_number,
        address: singleClinicStaffData?.data?.address,
        work: singleClinicStaffData?.data?.work,
      }));
    }
  }, [singleClinicStaffData]);

  useEffect(() => {
    if (clinicStaffId) {
      dispatch(fetchSingleClinicStaff(clinicStaffId));
    }
  }, [dispatch, clinicStaffId]);

  const options = clinicListData?.data?.map((item) => ({
    value: item._id,
    label: item.clinic_name,
  }));

  const handleSubmitNewStaff = async () => {
    const data = {
      name: values.staffName,
      email: values.email,
      p_number: `+1${values.number.trim()}`,
      address: values.address,
      work: values.work,
      role: "Staff",
      clinics: values?.officeName?.map((option) => option.value).toString(),
      clinicName: values?.officeName?.map((option) => option.label).toString(),
    };
    try {
      const actionResult = await dispatch(addClinicStaff(data));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/dashboard/office-staff");
      }
    } catch (error) {
      toast.error(error.message || "Error adding clinic");
    }
  };
  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_sub_conatiner}>
          <div className={styles.dashSub_blue}>
            {/* <div className={styles.compo_name}>View staff Details</div> */}
            <div className={styles.subCompBtns}>
              <button>Export</button>
            </div>
          </div>
          <div className={styles.card_container}>
            <div className={isDarkTheme === "dark" ? "card2" : "card mx-4"}>
              <div className="card-body">
                <div className={styles.info_control}>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Name</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.name}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Email</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.email}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Phone Number</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.p_number}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Address</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.address || "--"}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Office Name</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.clinicName?.length > 0
                        ? singleClinicStaffData?.data?.clinicName
                        : "--"}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>User Role</div>
                    <div className={styles.patient_name}>
                      {singleClinicStaffData?.data?.role}
                    </div>
                  </div>
                </div>
                <div className={styles.single_patient_btn}>
                  <Link href="/dashboard/clinic-staff">
                    <button>Back to list</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAdminStaffDetails;
