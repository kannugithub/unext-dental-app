import React, { useEffect, useState, useCallback } from "react";
import styles from "../../AllDashboardComponents/clinicDashboard/message.module.scss";
import Link from "next/link";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  fetchGetmessages,
  getFexapi,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import ChatComponent from "./messages/ChatComponent";
import TestTTT from "./messages/TestTTT";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import CreateAppointment from "./Appointments/CreateAppointment/CreateAppointment";
import AddnewMesagepopup from "./AddnewMessagepopup/AddnewMesagepopup";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import moment from "moment";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import CallLogs from "./CallLogs/CallLogs";

const Messages = ({
  activeItem,
  setActiveItem,
  reciverNum,
  setReciverNum,
  openPopup,
  setOpenPopup,
  reciverName,
  setReciverName,
  showDraft,
  setShowDraft,
  setClinicId,
  clinicId,
  selectedPatient,
  setSelectedPatient,
}) => {
  const dispatch = useDispatch();
  const [cliniNum, setCliniNum] = useState(null);
  const [searchUserForMessage, setSearchUserForMessage] = useState("");
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState(null);

  const messageList = useAppSelector((state) => state.clinic.messageList);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  const lastMessageSent = messageList?.data?.lastMessage;

  console.log(messageList?.data);

  const smsList = useAppSelector((state) => state.clinic.fetechGetSMSList);

  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const getClinicsDetailsData = useAppSelector(
    (state) => state.admin.getClinicsDetailsData
  );
  const handleClose = () => {
    setOpenCreateAppointment(false);
  };

  useEffect(() => {
    if (singleClinicData) {
      setCliniNum(singleClinicData?.data?.clinic_phone);
    }
  }, []);

  useEffect(() => {
    if (smsList) {
      if (smsList?.data?.length === 0 && selectedPatient) {
        setShowDraft(true);
        // setActiveItem(null);
      }
    }
  }, [smsList]);

  console.log({ smsList });

  const handleOpenChat = (num, reciver_name, clinic_id, key) => {
    console.log(num, "num");
    setActiveItem(activeItem === key ? null : key);
    setReciverNum(num);
    setOpenPopup(true);
    setReciverName(reciver_name);
    setClinicId(clinic_id);
    setShowDraft(false);
  };

  useEffect(() => {
    if (messageList) {
      if (activeItem === null) {
        setActiveItem(0);
      } else {
        const data = messageList?.data.findIndex(
          (data, index) => data?.contact === reciverNum
        );
        setActiveItem(data);
      }
      if (reciverNum === null) {
        setReciverNum(messageList?.data[0]?.contact);
      }
      const draft = messageList?.data.filter(
        (data, index) => data?.contact === reciverNum
      );
      console.log({ draft });
      if (draft?.length === 0) {
        setShowDraft(true);
      } else {
        setShowDraft(false);
      }
    }
  }, [messageList, smsList]);

  const handlePatientClick = (num, reciver_name, clinic_id, key, data) => {
    setSelectedPatient(data);
    setReciverNum(num);
    setOpenPopup(true);
    setReciverName(reciver_name);
    setClinicId(clinic_id);
    setOpenCreateAppointment(false);
  };

  const data = {
    from: cliniNum,
    clinicId: localStorage?.getItem("clinicId"),
  };

  useEffect(() => {
    if (singleClinicData) {
      setCliniNum(singleClinicData?.data?.clinic_phone);
    }
  }, [singleClinicData]);

  useEffect(() => {
    if (cliniNum !== null) {
      dispatch(fetchGetmessages(data));
    }
  }, [cliniNum]);

  const contactValues = messageList?.data?.map((item) => {
    let contactValue = null;
    for (const key in messageList?.unreadCountsPerNumber) {
      if (key === item.contact) {
        contactValue = messageList?.unreadCountsPerNumber[key];
        break;
      }
    }
    return contactValue;
  });

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_sub_conatiner}>
          <div className={styles.card_container}>
            <div className={styles.message_box}>
              <div className={styles.logs}>
                {showDraft && (
                  <div className={styles.demo_message}>
                    <div className={styles.active}>
                      <div className={styles.left}>
                        <span>
                          {/* {selectedPatient?.patient_name[0]?.toUpperCase()} */}
                        </span>
                      </div>
                      <div className={styles.middle}>
                        <span>
                          {selectedPatient?.patient_name
                            ? selectedPatient?.patient_name
                            : formatPhoneNumber(reciverNum)}
                        </span>
                        {/* <span style={{ fontStyle: "italic" }}>
                          {lastMessageSent ? lastMessageSent : "Draft"}
                        </span> */}
                      </div>
                      {/* <div className={styles.right}>
                      <span>10:02</span>
                    </div> */}
                    </div>
                  </div>
                )}
                {messageList?.data ? (
                  <div id="clinicListTable">
                    {messageList?.data?.length === 0
                      ? "no data found"
                      : messageList?.data?.map((item, key) => {
                          return (
                            <div
                              key={key}
                              //setReciverNum(item?.contact)

                              onClick={() =>
                                handleOpenChat(
                                  item?.contact,
                                  item?.patientDetails?.patient_name,
                                  item?._id,
                                  key
                                )
                              }
                              className={`${styles.logs_container} ${
                                activeItem === key ? styles.active : ""
                              }`}
                            >
                              <div className="col-md-10">
                                <div className={styles.card}>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "20px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div style={{ width: "15%" }}>
                                      <div className={styles.card_one}>
                                        {/* {item?.patientDetails?.patient_name?.split(
                                          "",
                                          1
                                        )} */}
                                        {item?.patientDetails?.profile_pic ? (
                                          <Image
                                            style={{ borderRadius: "100px" }}
                                            src={
                                              call.patientDetails?.profile_pic
                                            }
                                            width={50}
                                            height={50}
                                            alt="user icon"
                                          />
                                        ) : (
                                          <>
                                            {item?.patientDetails?.patient_name?.[0]?.toUpperCase() || (
                                              <Image
                                                style={{
                                                  borderRadius: "100px",
                                                }}
                                                src={Images.default_image}
                                                // width={50}
                                                // height={50}
                                                alt="user icon"
                                              />
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <div
                                      className={styles.card_one_sub}
                                      style={{ width: "80%" }}
                                    >
                                      <p>
                                        {item?.patientDetails?.patient_name ||
                                          formatPhoneNumber(item.contact)}
                                      </p>
                                      <span className={styles.message}>
                                        {item?.lastMessage}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-2">
                                <div
                                  className={styles.card_three}
                                  style={{
                                    textAlign: "end",
                                    paddingTop: "8px",
                                  }}
                                >
                                  {/* <p>19:48</p> */}
                                  <p>
                                    {moment(item.lastMessageSentAt).format(
                                      "HH:mm"
                                    )}
                                  </p>
                                  {/* {contactValues[key] !== 0 ? (
                                    <div className={styles.card_number}>
                                      <span>{contactValues[key]}</span>
                                    </div>
                                  ) : null} */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <SpinnerLoader />
                  </div>
                )}
              </div>
              <div
                className={styles.message_btn}
                onClick={() => setOpenCreateAppointment(true)}
              >
                <button>
                  {" "}
                  <Image src={Images.white_plus} alt="" />
                  &nbsp;&nbsp;send new message
                </button>
              </div>
            </div>

            <div className={styles.message_box2}>
              <ChatComponent
                reciverNum={cliniNum}
                senderNum={reciverNum}
                setOpenPopup={setOpenPopup}
                reciver_name={reciverName}
                setReciverName={setReciverName}
                searchUserForMessage={searchUserForMessage}
                messageList={messageList}
                activeItem={activeItem}
                smsList={smsList}
              />
            </div>
          </div>
        </div>
      </div>
      {openCreateAppointment && (
        <CustomModal
          isOpen={openCreateAppointment}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <AddnewMesagepopup
            setOpenCreateAppointment={setOpenCreateAppointment}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            handlePatientClick={handlePatientClick}
          />
        </CustomModal>
      )}
    </>
  );
};

export default Messages;
