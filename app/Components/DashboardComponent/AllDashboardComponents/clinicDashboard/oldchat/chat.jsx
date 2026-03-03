import React, { useEffect, useState } from "react";
import styles from "./chat.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch } from "react-redux";
import { searchMessages } from "@/app/store/slices/clinicAdminSlices";
import {
  fetechGetSMS,
  searchPatient,
  sendMessages,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const ChatComponent = ({
  reciverNum,
  senderNum,
  setOpenPopup,
  reciver_name,
  setReciverName,
  searchUserForMessage,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [clinicId, setClinicId] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const smsList = useAppSelector((state) => state.clinic.fetechGetSMSList);
  const searchPatientResultsForMessage = useAppSelector(
    (state) => state.clinic.searchPatientResultsForMessage
  );
  const sendMessagesDetails = useAppSelector(
    (state) => state.clinic.sendMessagesDetails
  );

  const socket = useAppSelector((state) => state.socket.socket);

  socket.on("connect_error", (error) => {
    console.log(error);
  });

  try {
    socket.connect();
  } catch (error) {
    console.error("Connection error:", error);
  }

  useEffect(() => {
    socket.on("smsChat", (message) => {
      console.log("Incoming message:", message);
    });
    return () => {
      socket.off("smsChat");
    };
  }, [socket]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  const handleFullscreen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError("Please select a file.");
      return;
    }

    const reader = new FileReader();

    const allowedExtensions = ["jpeg", "jpg", "png", "doc", "pdf"];

    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setFileError("Only jpeg, jpg, png, doc, and pdf files are allowed.");
      return;
    }

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setSelectedFile(file);
      // Reset the message input when a file is selected
      setValues({ ...values, message: "" });
    };

    reader.readAsDataURL(file);
    setFileError("");
  };
  useEffect(() => {
    if (searchQuery !== "") {
      dispatch(searchMessages({ patient_name: searchQuery, clinicId })).then(
        (action) => {
          if (action.payload) {
            setSearchResults(action.payload);
          }
        }
      );
    } else {
      setSearchResults([]); // Reset searchResults when searchQuery is empty
    }
  }, [searchQuery, clinicId, dispatch]);

  const handleClosePopup = () => {
    setOpenPopup(false);
    setReciverName();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the input is for the message
    if (name === "message") {
      setValues({ ...values, [name]: value });
    }
  };
  // const handleInputChange = (event) => {
  //   const { value } = event.target;
  //   const isNumeric = /^\d+$/.test(value);
  //   const data = isNumeric ? { contact: value } : { patient_name: value };
  //   dispatch(searchPatient(data));
  // };

  const handleSendTextSms = async (e) => {
    e.preventDefault();

    let data;
    if (searchUserForMessage === "messageSearch") {
      data = {
        message: values.message,
        from: reciverNum,
        to: searchQuery,
      };
    } else {
      data = {
        message: values.message,
        from: reciverNum,
        to: senderNum,
      };
    }
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("from", reciverNum);
    formData.append("to", senderNum || searchQuery);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const actionResult = dispatch(sendMessages(formData));
      actionResult.then((result) => {
        if (result?.payload?.success) {
          setValues({ message: "" });
        }
      });
    } catch (error) {
      toast.error(error.message || "Error while sending sms");
    }
  };

  let data;
  if (searchUserForMessage === "messageSearch") {
    data = {
      from: reciverNum,
      to: searchQuery,
    };
  } else {
    data = {
      from: reciverNum,
      to: senderNum,
    };
  }

  useEffect(() => {
    if (reciverNum !== undefined && senderNum !== undefined) {
      dispatch(fetechGetSMS(data));
    }
  }, [reciverNum, senderNum, sendMessagesDetails]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
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
              {searchUserForMessage === "messageSearch" ? (
                <div className={styles.header_inp_box}>
                  {isDarkTheme === "dark" ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.457 11.6406C14.043 10.7188 14.3867 9.625 14.3867 8.44922C14.3867 5.16406 11.7266 2.5 8.44531 2.5C5.16016 2.5 2.5 5.16406 2.5 8.44922C2.5 11.7344 5.16016 14.3984 8.44141 14.3984C9.63281 14.3984 10.7422 14.0469 11.6719 13.4453L11.9414 13.2578L16.1836 17.5L17.5 16.1602L13.2617 11.918L13.457 11.6406ZM11.7734 5.125C12.6602 6.01172 13.1484 7.19141 13.1484 8.44531C13.1484 9.69922 12.6602 10.8789 11.7734 11.7656C10.8867 12.6523 9.70703 13.1406 8.45312 13.1406C7.19922 13.1406 6.01953 12.6523 5.13281 11.7656C4.24609 10.8789 3.75781 9.69922 3.75781 8.44531C3.75781 7.19141 4.24609 6.01172 5.13281 5.125C6.01953 4.23828 7.19922 3.75 8.45312 3.75C9.70703 3.75 10.8867 4.23828 11.7734 5.125Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <Image src={Images.searchIcon} alt="search icon" />
                  )}
                  <input
                    type="search"
                    placeholder="Type Patient Name, Phone Number, Email, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              ) : (
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
              )}
            </div>
            <div className={styles.chatting_box_wrapper}>
              <div
                className={styles.chatting_box}
                style={{ minHeight: "600px" }}
              >
                {smsList?.data?.length === 0 ? (
                  <div style={{ textAlign: "center" }}> No message found</div>
                ) : (
                  <>
                    {smsList?.data?.map((item, key) => (
                      <div
                        className={styles.chatting_second_div_wrapper}
                        key={key}
                      >
                        <div className={styles.left_div_wrapper}>
                          {item?.data?.from === reciverNum ? (
                            <div
                              className={styles.left_div}
                              style={{ maxWidth: "556px" }}
                            >
                              {item?.Body}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className={styles.right_div_wrapper}>
                          {item?.data?.phone_number === senderNum ||
                          searchQuery ? (
                            <div
                              className={styles.right_div}
                              style={{ maxWidth: "556px" }}
                            >
                              {item?.data?.Body}
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
                    onChange={handleInputChange}
                  />
                  <div className={styles.sendandupload}>
                    <div className={styles.icon_wrappers}></div>{" "}
                    <button type="submit">
                      {isDarkTheme === "dark" ? (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse
                            cx="18"
                            cy="17.5814"
                            rx="18"
                            ry="17.5814"
                            fill="#409EEE"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.send_chat_con} alt="" />
                      )}
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
              {searchUserForMessage === "messageSearch" ? (
                <>
                  <div className={styles.header_inp_box}>
                    {isDarkTheme === "dark" ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.457 11.6406C14.043 10.7188 14.3867 9.625 14.3867 8.44922C14.3867 5.16406 11.7266 2.5 8.44531 2.5C5.16016 2.5 2.5 5.16406 2.5 8.44922C2.5 11.7344 5.16016 14.3984 8.44141 14.3984C9.63281 14.3984 10.7422 14.0469 11.6719 13.4453L11.9414 13.2578L16.1836 17.5L17.5 16.1602L13.2617 11.918L13.457 11.6406ZM11.7734 5.125C12.6602 6.01172 13.1484 7.19141 13.1484 8.44531C13.1484 9.69922 12.6602 10.8789 11.7734 11.7656C10.8867 12.6523 9.70703 13.1406 8.45312 13.1406C7.19922 13.1406 6.01953 12.6523 5.13281 11.7656C4.24609 10.8789 3.75781 9.69922 3.75781 8.44531C3.75781 7.19141 4.24609 6.01172 5.13281 5.125C6.01953 4.23828 7.19922 3.75 8.45312 3.75C9.70703 3.75 10.8867 4.23828 11.7734 5.125Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <Image src={Images.searchIcon} alt="search icon" />
                    )}
                    <input
                      type="search"
                      placeholder="Type Patient Name, Phone Number"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className={styles.header_img}>
                  <div className={styles.title_wrapper}>
                    <Image src={Images.userIcon} alt="" />
                  </div>
                  <div className={styles.title_text}>
                    <span>Chat with</span>
                    <p>{reciver_name || "User"}</p>
                  </div>
                </div>
              )}

              {/* )} */}
            </div>
            {searchResults.length > 0 &&
              searchResults
                .filter((result) =>
                  result
                    ? result.patient_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      result.contact
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      result.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    : false
                )
                .map((result) => {
                  // Escape special characters in search query for safe use in regex
                  const escapedSearchQuery = searchQuery.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                  );

                  // Highlight matched terms
                  const patientName = result.patient_name.replace(
                    new RegExp(`(${escapedSearchQuery})`, "gi"),
                    (match) => `<span className="highlight">${match}</span>`
                  );
                  const contact = result.contact.replace(
                    new RegExp(`(${escapedSearchQuery})`, "gi"),
                    (match) => `<span className="highlight">${match}</span>`
                  );

                  return (
                    <div
                      key={result._id}
                      className={styles.searched_list}
                      onClick={() => {
                        setSearchQuery(result?.contact);
                        setSearchResults([]);
                      }}
                    >
                      <div
                        className={styles.list}
                        dangerouslySetInnerHTML={{
                          __html: patientName,
                        }}
                      />
                      <div
                        className={styles.list}
                        dangerouslySetInnerHTML={{
                          __html: contact || patientName,
                        }}
                      />
                    </div>
                  );
                })}

            <div className={styles.chatting_box_wrapper}>
              <div className={styles.chatting_box}>
                {smsList?.data?.length === 0 ? (
                  <div style={{ textAlign: "center" }}> No message found</div>
                ) : (
                  <>
                    {smsList?.data
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <div
                          className={styles.chatting_second_div_wrapper}
                          key={index}
                        >
                          <div className={styles.left_div_wrapper}>
                            {item.direction !== "outbound-api" &&
                              item.from !== reciverNum && (
                                <div className={styles.left_div}>
                                  {item.body}
                                </div>
                              )}
                          </div>

                          <div className={styles.right_div_wrapper}>
                            {(item.to === senderNum ||
                              item.to === searchQuery) && (
                              <div className={styles.right_div}>
                                {item.body}
                              </div>
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
                  <div
                    className={styles.upload_circle}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        document.getElementById("imageUpload").click();
                      }
                    }}
                  >
                    <div className={styles.img_wrapper}>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4263 1.3125H3.57375C2.32725 1.3125 1.3125 2.3265 1.3125 3.57375V14.427C1.3125 15.6735 2.3265 16.6883 3.57375 16.6883H14.427C15.6735 16.6883 16.6883 15.6743 16.6883 14.427V3.57375C16.6875 2.3265 15.6735 1.3125 14.4263 1.3125ZM15.783 14.4263C15.783 15.174 15.1748 15.783 14.4263 15.783H3.57375C2.826 15.783 2.217 15.1748 2.217 14.4263V12.7905L5.8665 8.73525L10.7963 13.2165L13.5225 10.9448L15.7838 12.8288L15.783 14.4263ZM15.783 11.652L13.5218 9.768L10.821 12.018L5.80275 7.455L2.217 11.439V3.57375C2.217 2.826 2.82525 2.217 3.57375 2.217H14.427C15.1748 2.217 15.7838 2.82525 15.7838 3.57375L15.783 11.652Z"
                          fill="#66859E"
                        />
                        <path
                          d="M12.1655 8.09574C13.412 8.09574 14.4268 7.08174 14.4268 5.83449C14.4268 4.58724 13.4128 3.57324 12.1655 3.57324C10.919 3.57324 9.9043 4.58724 9.9043 5.83449C9.9043 7.08174 10.9183 8.09574 12.1655 8.09574ZM12.1655 4.47849C12.9133 4.47849 13.5223 5.08674 13.5223 5.83524C13.5223 6.58374 12.914 7.19199 12.1655 7.19199C11.417 7.19199 10.8088 6.58374 10.8088 5.83524C10.8088 5.08674 11.417 4.47849 12.1655 4.47849Z"
                          fill="#66859E"
                        />
                      </svg>
                      &nbsp;
                    </div>
                    <div className={styles.inptDiv}>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="doc/* pdf/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <input
                    name="message"
                    type="text"
                    placeholder="Enter your message..."
                    // value={
                    //   selectedFile
                    //     ? `${selectedFile.name} ${values.message}`
                    //     : values.message || ""
                    // }
                    value={values.message || ""}
                    onChange={handleInputChange}
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
      </div>
    </>
  );
};

export default ChatComponent;
