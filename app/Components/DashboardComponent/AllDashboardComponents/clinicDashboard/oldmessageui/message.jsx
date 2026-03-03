import React, { useEffect, useState } from "react";
import styles from "../../AllDashboardComponents/clinicDashboard/message.module.scss";
import { useRouter } from "next/router";
import Images from "@/app/Components/Images/Images";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetmessages } from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import ChatComponent from "./messages/ChatComponent";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";

const Messages = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { number } = router.query; // Get the number from the query parameters
  const [openPopup, setOpenPopup] = useState(false);
  const [reciverNum, setReciverNum] = useState(null);
  const [reciverName, setReciverName] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [searchUserForMessage, setSearchUserForMessage] = useState("");

  const messageList = useAppSelector((state) => state.clinic.messageList);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (singleClinicData) {
      setReciverNum(singleClinicData?.data?.clinic_phone);
    }
  }, [singleClinicData]);

  useEffect(() => {
    if (number) {
      dispatch(fetchGetmessages({ from: number }));
    }
  }, [number]);

  const handleOpenChat = (num, reciver_name, clinic_id) => {
    setReciverNum(num);
    setOpenPopup(true);
    setReciverName(reciver_name);
    setClinicId(clinic_id);
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.dashboard_sub_conatiner}>
        <div className={styles.dashSub_blue}>
          <div className={styles.compo_name}>Messages</div>
          <div className={styles.subCompBtns}>
            <button
              onClick={() => {
                setOpenPopup(true);
                setSearchUserForMessage("messageSearch");
              }}
            >
              Send Message
            </button>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className={isDarkTheme === "dark" ? styles.card2 : "card mx-4"}>
            <div className="card-body">
              {messageList?.data ? (
                <div className="table-responsive">
                  <table className="table">
                    <tbody id="clinicListTable">
                      {messageList?.data?.length === 0
                        ? "no data found"
                        : messageList?.data?.map((item, key) => (
                            <tr
                              key={key}
                              onClick={() =>
                                handleOpenChat(
                                  item?.contact,
                                  item?.patientDetails?.patient_name,
                                  item?._id
                                )
                              }
                            >
                              <td>
                                <div className={styles.message_wrapepr}>
                                  <div className={styles.img_circle}>
                                    {item?.patientDetails?.patient_name?.split(
                                      "",
                                      1
                                    )}
                                  </div>
                                  <div className={styles.user_detail_wrap}>
                                    <p>
                                      {item?.patientDetails?.patient_name ||
                                        item?.contact}
                                    </p>
                                    <span>{item?.lastMessage || "hello"}</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <SpinnerLoader />
                </div>
              )}
            </div>
          </div>
        </div>
        {openPopup ? (
          <ChatComponent
            reciverNum={reciverNum}
            senderNum={number}
            setOpenPopup={setOpenPopup}
            reciver_name={reciverName}
            setReciverName={setReciverName}
            searchUserForMessage={searchUserForMessage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Messages;
