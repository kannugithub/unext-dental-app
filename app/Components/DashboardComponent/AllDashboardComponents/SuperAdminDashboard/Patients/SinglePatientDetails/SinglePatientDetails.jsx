import { useAppSelector } from "@/app/store/lib/hooks";
import styles from "./singlePatient.module.scss";
import { fetchSinglePatient } from "@/app/store/slices/superAdminSlices";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Link from "next/link";

const SinglePatientDetails = () => {
  const [url, setUrl] = useState();
  const patientData = useAppSelector(
    (state) => state?.admin?.singlePatientData
  );
  const dispatch = useDispatch();
  console.log("patientData", patientData);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(url.split("?")[1]);
      const patientId = params.get("item");
      dispatch(fetchSinglePatient(patientId));
    }
  }, [url]);
  return (
    <>
      <div className={styles.dashboard_sub_conatiner}>
        <div className={styles.dashSub_blue}>
          <div className={styles.compo_name}>View Patinet Details</div>
          <div className={styles.subCompBtns}>
            <button>Export</button>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className="card mx-4">
            <div className="card-body">
              <div className={styles.info_control}>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Patient Name</div>
                  <div className={styles.patient_name}>
                    {patientData?.data?.patient_name}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Phone Number</div>
                  <div className={styles.patient_name}>
                    {patientData?.data?.contact}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Email Id</div>
                  <div className={styles.patient_name}>
                    {patientData?.data?.email}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Date of Birth</div>
                  <div className={styles.patient_name}>
                    {moment(patientData?.data?.dob).format("MMM Do YY")}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Gender</div>
                  <div className={styles.patient_name}>
                    {patientData?.data?.gender}
                  </div>
                </div>
                <div className={styles.patient_boxes}>
                  <div className={styles.patient_title}>Dental Office Name</div>
                  <div className={styles.patient_name}>
                    {patientData?.data?.clinic_name}
                  </div>
                </div>
              </div>
              <div className={styles.single_patient_btn}>
                <Link href="/dashboard/patients">
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

export default SinglePatientDetails;
