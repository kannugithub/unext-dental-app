import React, { useEffect, useState } from "react";
import styles from "./calllog.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchAllUserData } from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import {
  DownloadTranscript,
  SendrequestPaymentLink,
  fetchAllCalllogData,
} from "@/app/store/slices/clinicAdminSlices";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import CallLogAlert from "../eFax/EfaxAlert";
import CallTabpopup from "../Calltabpopup/CallTabpopup";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import { toast } from "react-toastify";

const CallLogs = ({
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
  currentTab,
  changeTab,
  setExpandedMenu,
  handleOpenMessage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cliniNum, setCliniNum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callAlert, setCallAlert] = useState(false);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);

  const phoneNumber = useAppSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_phone
  );

  const link = useAppSelector(
    (state) => state.clinic.SendrequestPaymentLinkData?.data
  );
  console.log(link, "link");

  let number = phoneNumber;
  number = number?.replace(/^\+/, "");

  const clinicId = useAppSelector(
    (state) => state.admin.singleClinicData?.data?._id
  );

  const handleClose = () => {
    setCallAlert(false);
  };

  const getCalllogList = useAppSelector(
    (state) => state.clinic.getCalllogList?.results
  );

  const employee_id = useAppSelector(
    (state) => state.authWeb.userInfo?.user?._id
  );

  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCalllogData({ clinicId, number })).then(() => {
      setLoading(false);
    });
  }, [dispatch, clinicId, number]);

  const data = {
    from: cliniNum,
    clinicId: localStorage?.getItem("clinicId"),
  };

  const handlecalender = async (contact) => {
    if (contact) {
      const cleanedNumber = contact.replace(/^\+/, "");
      await router.push(`/dashboard/messages?number=${cleanedNumber}`);
    }
  };

  const handleScheduleAppointment = async (patientDetails) => {
    if (patientDetails) {
      localStorage.setItem("callpatientDetails", patientDetails);
      localStorage.setItem("openSchedule", "true");
      await router.push(`/dashboard/appointments/new-appointments`);
    }
  };

  const handleTranscript = async (call_control_id) => {
    try {
      const result = await dispatch(
        DownloadTranscript(call_control_id)
      ).unwrap();
      if (result.transcription) {
        const url = result.transcription;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Failed to download transcript:", error);
    }
  };

  const handledollor = async (patientDetails) => {
    if (patientDetails) {
      const amountWithoutDollar = patientDetails.balance
        ? patientDetails.balance.replace("$", "")
        : 0;
      setSelectedPatientDetails({
        amount: parseFloat(amountWithoutDollar),
        patient_number: patientDetails.contact || patientDetails,
        patientId: patientDetails._id || "",
        email: patientDetails.email || "",
      });
    }

    const data = {
      patient_number: selectedPatientDetails.patient_number,
      amount: selectedPatientDetails.amount || 0,
      clinicId: clinicId,
    };

    try {
      const actionResult = await dispatch(SendrequestPaymentLink(data));
      const { success, message } = actionResult.payload;
      if (success) {
        // toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    }
    setCallAlert(true);
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
            <div className={styles.compo_name}>
              <span>Call Logs</span>
              <div className={styles.header_inp_box}>
                <Image src={Images.blue_search} alt="search icon" />
                <input
                  type="text"
                  name=""
                  placeholder="Type Patient Name, Phone Number, Email, ID"
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : (
            <>
              <div className={styles.card_container}>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col" style={{ textAlign: "left" }}>
                            Balance
                          </th>
                          <th
                            scope="col"
                            style={{ textAlign: "end", paddingRight: "100px" }}
                          >
                            Quick action
                          </th>
                          <th
                            scope="col"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              justifyContent: "flex-end",
                            }}
                          >
                            Last Contact
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {getCalllogList?.data?.length > 0 ? (
                          getCalllogList?.data?.map((call, index) => (
                            <tr key={index}>
                              <td>
                                <div
                                  className={styles.card_one}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                  }}
                                >
                                  <div
                                    style={{
                                      background: "#119898",
                                      borderRadius: "50%",
                                      height: "50px",
                                      width: "50px",
                                      justifyContent: "center",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {call.patientDetails?.profile_pic ? (
                                      <Image
                                        style={{ borderRadius: "100px" }}
                                        src={call.patientDetails?.profile_pic}
                                        width={50}
                                        height={50}
                                        alt="user icon"
                                      />
                                    ) : (
                                      <div
                                        style={{
                                          color: "white",
                                          fontSize: "18px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {call.patientDetails?.patient_name?.[0]?.toUpperCase() || (
                                          <Image
                                            style={{ borderRadius: "100px" }}
                                            src={Images.default_image}
                                            alt="user icon"
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div className={styles.card_one_sub}>
                                    {call.patientDetails ? (
                                      <>
                                        <p>
                                          {call.patientDetails.patient_name}
                                          &nbsp;&nbsp;&nbsp;
                                          {call.callType === "miscall" && (
                                            <Image
                                              src={Images.missedcall_icon}
                                            />
                                          )}
                                          {call.callType === "incoming" && (
                                            <Image src={Images.incoming} />
                                          )}
                                          {call.callType === "outgoing" && (
                                            <Image src={Images.outgoing} />
                                          )}
                                        </p>
                                        <span>
                                          {formatPhoneNumber(
                                            call.patientDetails.contact
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <p>
                                          {formatPhoneNumber(
                                            call.callDetails?.to
                                          )}
                                          &nbsp;&nbsp;&nbsp;
                                          {call.callType === "miscall" && (
                                            <Image
                                              src={Images.missedcall_icon}
                                            />
                                          )}
                                          {call.callType === "incoming" && (
                                            <Image src={Images.incoming} />
                                          )}
                                          {call.callType === "outgoing" && (
                                            <Image src={Images.outgoing} />
                                          )}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td style={{ textAlign: "left" }}>
                                <span>
                                  {call?.patientDetails?.balance !== undefined
                                    ? call.patientDetails.balance
                                        .toString()
                                        .startsWith("$")
                                      ? call.patientDetails.balance
                                      : "$" + call.patientDetails.balance
                                    : 0}
                                </span>
                              </td>
                              <td>
                                <div
                                  className={styles.card_two}
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "flex-end",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Image
                                    src={Images.message_blue}
                                    onClick={() =>
                                      handleOpenMessage(
                                        call.callDetails?.to,
                                        call.callDetails?.to,
                                        call.callDetails?.clinic_id,
                                        index,
                                        call
                                      )
                                    }
                                    alt="message"
                                  />
                                  {console.log(call.callDetails?.to, "number")}

                                  <Image
                                    src={Images.cemera_blue}
                                    onClick={() =>
                                      handleScheduleAppointment(
                                        call.patientDetails ||
                                          call.callDetails?.to
                                      )
                                    }
                                  />
                                  <Image
                                    src={Images.Mobile_click}
                                    onClick={() =>
                                      handleTranscript(
                                        call.callDetails?.call_control_id
                                      )
                                    }
                                  />
                                  <Image
                                    src={Images.dollor_icon}
                                    alt="mobile icon"
                                    onClick={() =>
                                      handledollor(
                                        call.patientDetails ||
                                          call.callDetails?.to
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div className={styles.card_three}>
                                  <p>
                                    {new Date(
                                      call.callDetails?.createdAt || "--"
                                    )
                                      .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                      })
                                      .replace(/\//g, "/")}
                                  </p>
                                  <span>
                                    {new Date(
                                      call.callDetails?.createdAt
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                    })}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {callAlert && (
        <RightCustomModal
          isOpen={callAlert}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <CallTabpopup
            setCallAlert={setCallAlert}
            link={link}
            patient_number={selectedPatientDetails.patient_number}
            email={selectedPatientDetails.email}
            amount={selectedPatientDetails.amount}
            patientId={selectedPatientDetails.patientId}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default CallLogs;
