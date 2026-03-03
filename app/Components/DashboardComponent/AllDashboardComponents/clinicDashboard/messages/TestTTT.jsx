import React, { useEffect, useMemo, useState } from "react";
import styles from "./chat.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch } from "react-redux";
import {
  fetechGetSMS,
  sendMessages,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";

const TestTTT = ({ reciverNum, senderNum, setOpenPopup, reciver_name }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});

  const smsList = useAppSelector((state) => state.clinic.fetechGetSMSList);
  const sendMessagesDetails = useAppSelector(
    (state) => state.clinic.sendMessagesDetails
  );

  useEffect(() => {
    if (reciverNum !== undefined && senderNum !== undefined) {
      dispatch(fetechGetSMS(data));
    }
  }, [reciverNum, senderNum, sendMessagesDetails]);

  const handleFullscreen = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const data = {
    from: reciverNum,
    to: senderNum,
  };

  const handleInputChanage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSendTextSms = async (e) => {
    e.preventDefault();

    const data = {
      message: values.message,
      from: reciverNum,
      to: senderNum,
    };
    try {
      const actionResult = dispatch(sendMessages(data));
      actionResult.then((result) => {
        if (result?.payload?.success) {
          setValues({ message: "" });
        }
      });
    } catch (error) {
      toast.error(error.message || "Error while sending sms");
    }
  };

  return (
    <>
      {open ? (
        <div
          className={styles.chat_wrapper}
          style={{
            width: "97%",
            height: "80vh",
            left: "23px",
            top: "0px",
            transition: "0.5s",
          }}
        >
          <div className={styles.header_bar}>
            <div className={styles.icons_wrapper}>
              <div
                style={{ left: "1230px", width: "fit-content", right: "0" }}
                className={styles.icons}
              >
                <Image src={Images.Xbtn} alt="" onClick={handleClosePopup} />
              </div>
            </div>
            <div
              className={styles.header_img}
              style={{ padding: "30px 0 35px 20px" }}
            >
              <div className={styles.title_wrapper}>
                <Image src={Images.userIcon} alt="" />
              </div>
              <div className={styles.title_text}>
                <span>Chat with</span>
                <p>{reciver_name || "User"}</p>
              </div>
            </div>
          </div>
          <div className={styles.chatting_box_wrapper}>
            <div className={styles.chatting_box} style={{ minHeight: "600px" }}>
              {smsList?.data?.length === 0 ? (
                <div style={{ textAlign: "center" }}> No sms found</div>
              ) : (
                <>
                  {smsList?.data?.map((item, key) => (
                    <div className={styles.chatting_second_div_wrapper}>
                      <div className={styles.left_div_wrapper} key={key}>
                        {item?.data?.data?.payload?.from?.phone_number !==
                        reciverNum ? (
                          <div
                            className={styles.left_div}
                            style={{ maxWidth: "556px" }}
                          >
                            {item?.data?.data?.payload?.text}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className={styles.right_div_wrapper}>
                        {item?.data?.data?.payload?.from?.phone_number ===
                        reciverNum ? (
                          <div
                            className={styles.right_div}
                            style={{ maxWidth: "556px" }}
                          >
                            {item?.data?.data?.payload?.text}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <hr />
            <form action="" onSubmit={handleSendTextSms}>
              <div className={styles.input_box_wrapper}>
                <input
                  name="message"
                  type="text"
                  placeholder="Enter your message..."
                  value={values.message}
                  onChange={handleInputChanage}
                />
                <div className={styles.sendandupload}>
                  <div className={styles.icon_wrappers}></div>{" "}
                  <button type="submit">
                    <Image src={Images.send_chat_con} alt="" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.chat_wrapper}>
          <div className={styles.header_bar}>
            <div className={styles.icons_wrapper}>
              <div className={styles.icons}>
                <Image
                  src={Images.maxScreen}
                  alt=""
                  onClick={handleFullscreen}
                />
                <Image src={Images.Xbtn} alt="" onClick={handleClosePopup} />
              </div>
            </div>
            <div className={styles.header_img}>
              <div className={styles.title_wrapper}>
                <Image src={Images.userIcon} alt="" />
              </div>
              <div className={styles.title_text}>
                <span>Chat with</span>
                <p>{reciver_name || "User"}</p>
              </div>
            </div>
          </div>
          <div className={styles.chatting_box_wrapper}>
            <div className={styles.chatting_box}>
              {smsList?.data?.length === 0 ? (
                <div style={{ textAlign: "center" }}> No sms found</div>
              ) : (
                <>
                  {smsList?.data?.map((item, key) => (
                    <div
                      className={styles.chatting_second_div_wrapper}
                      key={key}
                    >
                      <div className={styles.left_div_wrapper}>
                        {item?.data?.data?.payload?.from?.phone_number !==
                        reciverNum ? (
                          <>
                            <div className={styles.left_div}>
                              {item?.data?.data?.payload?.text}
                            </div>
                            <span></span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className={styles.right_div_wrapper}>
                        {item?.data?.data?.payload?.from?.phone_number ===
                        reciverNum ? (
                          <div className={styles.right_div}>
                            {item?.data?.data?.payload?.text}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <hr />

            <form action="" onSubmit={handleSendTextSms}>
              <div className={styles.input_box_wrapper}>
                <input
                  name="message"
                  type="text"
                  placeholder="Enter your message..."
                  value={values.message}
                  onChange={handleInputChanage}
                />
                <div className={styles.sendandupload}>
                  <div className={styles.icon_wrappers}></div>{" "}
                  <button type="submit">
                    <Image src={Images.send_chat_con} alt="" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TestTTT;
