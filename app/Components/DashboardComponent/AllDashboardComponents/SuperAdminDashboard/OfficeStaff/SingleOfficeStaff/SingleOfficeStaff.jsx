import React, { useEffect, useState } from "react";
import styles from "./singleOffice.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchSingleClinicStaff } from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import moment from "moment";

const SingleOfficeStaff = () => {
  const [singleOfficeData, srtSingleOfficeData] = useState(null);
  const [url, setUrl] = useState();
  const dispatch = useDispatch();
  const singleClinicData = useAppSelector(
    (state) => state?.admin?.singleClinicStaffInfo
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(url.split("?")[1]);
      const patientId = params.get("item");
      dispatch(fetchSingleClinicStaff(patientId));
    }
  }, [url]);
  return (
    <>
      <div className={styles.dashboard_sub_conatiner}>
        <div className={styles.dashSub_blue}>
          {/* <div className={styles.compo_name}>View Office Staff Details</div> */}
          <div className={styles.subCompBtns}>
            <button>Export</button>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className="card mx-4">
            <div className="card-body">
              <div className={styles.info_control}>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Name</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.name}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Email</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.email}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Phone Number</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.p_number}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Address</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.address}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Office Name</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.clinicName}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Work</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.work}
                  </div>
                </div>
              </div>
              <div className={styles.single_patient_btn}>
                <Link href="/dashboard/office-staff">
                  <button>Back to list</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOfficeStaff;
