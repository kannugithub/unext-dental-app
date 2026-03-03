import React, { useEffect, useState } from "react";
import styles from "./singleClinicDetails.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { getClinicsDetails } from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";

const SingleClinicDetails = () => {
  const [url, setUrl] = useState();
  const singleClinicData = useAppSelector(
    (state) => state.admin.getClinicsDetailsData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(url.split("?")[1]);
      const clinicId = params.get("item");

      dispatch(getClinicsDetails(clinicId));
    }
  }, [url]);

  return (
    <>
      <div className={styles.dashboard_sub_conatiner}>
        <div className={styles.dashSub_blue}>
          {/* <div className={styles.compo_name}>View office details</div> */}
          <div className={styles.subCompBtns}>
            <button>Export</button>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className="card mx-4">
            <div className="card-body">
              <div className={styles.info_control}>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Clinic Name</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.clinic_name}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Phone Number</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.clinic_phone}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Email Id</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.clinic_email}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Created at</div>
                  <div className={styles.patient_name}>
                    {moment(singleClinicData?.data?.createdAt).format(
                      "MMM Do YY"
                    )}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Address</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.clinic_address}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Call recording</div>
                  <div className={styles.patient_name}>
                    {singleClinicData?.data?.call_recording}
                  </div>
                </div>
              </div>
              <div className={styles.single_patient_btn}>
                <Link href="/dashboard/office">
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

export default SingleClinicDetails;
