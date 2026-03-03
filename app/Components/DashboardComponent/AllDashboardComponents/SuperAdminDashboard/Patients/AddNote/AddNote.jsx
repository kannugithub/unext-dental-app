import React, { useEffect, useState } from "react";
import styles from "./Addnote.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import {
  fetchPatientNotes,
  sendAddPatientNote,
} from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/store/lib/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";

const AddNote = ({ closeNote, singlePatientId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [values, setValues] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const singlePatientDataList = useAppSelector(
    (state) => state.admin.singlePatientData
  );
  const getPatientNoteData = useAppSelector(
    (state) => state.admin.getPatientNotes
  );
  const dispatch = useDispatch();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  console.log("getPatientNoteData", getPatientNoteData);

  useEffect(() => {
    dispatch(fetchPatientNotes(singlePatientId));
  }, [singlePatientId]);

  const handleSendPatientNotes = async () => {
    const data = {
      patient_id: singlePatientDataList?.data?._id,
      employee_id: userInfoData?.user?._id,
      notes: values,
    };
    if (dataLoading || values.trim() === "") {
      return;
    }
    setDataLoading(true);
    try {
      const actionResult = await dispatch(sendAddPatientNote(data));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        dispatch(fetchPatientNotes(singlePatientId));
        setDataLoading(false);
        setValues("");
      }
    } catch (error) {
      toast.error(error.message);
      setDataLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendPatientNotes();
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.close_icons}>
          {isDarkTheme === "dark" ? (
            <Image
              style={{ cursor: "pointer" }}
              src={Images.whiteclose_icon}
              onClick={() => closeNote()}
            ></Image>
          ) : (
            <Image
              style={{ cursor: "pointer" }}
              src={Images.blackCrossIcon}
              onClick={() => closeNote()}
            ></Image>
          )}
        </div>
        <div className={styles.confirm_container}>
          <div className={styles.confirm_hTag}>Add Notes</div>
          {getPatientNoteData?.data?.map((item, key) => (
            <div className={styles.patient_name} key={key}>
              <p>
                {item?.employee_id?.name || "Unknown"}  
                <span> {moment(item.createdAt).fromNow()}</span>
              </p>
              <span>{item?.notes}</span>
            </div>
          ))}

          <div className={styles.patient_name1}>
            <input
              type="text"
              placeholder="Type..."
              value={values}
              onChange={(e) => setValues(e.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
            <button
              type="submit"
              onClick={handleSendPatientNotes}
              disabled={dataLoading}
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5005 9.09993L1.60045 0.0999257C0.700449 -0.300074 -0.299551 0.499926 0.100449 1.39993L2.60045 8.09993L14.0004 9.99993L2.60045 11.8999L0.100449 18.5999C-0.199551 19.4999 0.700449 20.2999 1.60045 19.7999L19.5005 10.7999C20.2005 10.4999 20.2005 9.49993 19.5005 9.09993Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
