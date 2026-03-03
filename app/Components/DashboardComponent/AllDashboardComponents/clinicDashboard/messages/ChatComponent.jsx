import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import EmojiPicker from "emoji-picker-react";
import SwitchToggle from "@/app/Components/common/SwitchToggle/SwitchToggle";
import moment from "moment";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import SendImage from "@/app/assets/svgComponent/SendImage";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import Plus from "@/app/assets/svgComponent/Plus";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";

const ChatComponent = ({
  reciverNum,
  senderNum,
  setOpenPopup,
  reciver_name,
  setReciverName,
  searchUserForMessage,
  messageList,
  activeItem,
  smsList,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ message: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [clinicId, setClinicId] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [openMedia, setopenMedia] = useState(false);
  const emojiPickerRef = useRef(null);
  const mediaPickerRef = useRef(null);
  const [openEmoji, setopenEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const onEmojiClick = (emojiObject) => {
    const newEmoji = emojiObject.emoji;
    const updatedMessage = `${values.message || ""}${newEmoji}`;
    setSelectedEmoji(newEmoji);
    setValues({ ...values, message: updatedMessage });
  };

  const onRequestIdentificationClick = useCallback(
    (e) => {
      e.preventDefault();
      const newMessage =
        "Please Send a clear picture of your identification card";
      setLoading(true);

      let data;
      if (searchUserForMessage === "messageSearch") {
        data = {
          message: newMessage,
          from: reciverNum,
          to: searchQuery,
        };
      } else {
        data = {
          message: newMessage,
          from: reciverNum,
          to: senderNum,
        };
      }

      const formData = new FormData();
      formData.append("message", newMessage);
      formData.append("from", reciverNum);
      formData.append("to", senderNum || searchQuery);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      try {
        const actionResult = dispatch(sendMessages(formData, setSelectedFile));
        actionResult.then((result) => {
          if (result?.payload?.success) {
            setValues((prevValues) => ({ ...prevValues, message: "" }));
            setLoading(false);
          }
        });
      } catch (error) {
        toast.error(error.message || "Error while sending sms");
      }
    },
    [
      searchUserForMessage,
      reciverNum,
      searchQuery,
      senderNum,
      selectedFile,
      dispatch,
      setValues,
    ]
  );

  const handleClickOutside = (event) => {
    if (
      mediaPickerRef.current &&
      !mediaPickerRef.current.contains(event.target)
    ) {
      setopenMedia(false);
    }
  };

  useEffect(() => {
    if (openMedia) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMedia]);

  const onRequestInsuranceClick = useCallback(
    (e) => {
      e.preventDefault();
      const newMessage = "Please Send a clear picture of your Insurance card";
      setLoading(true);

      let data;
      if (searchUserForMessage === "messageSearch") {
        data = {
          message: newMessage,
          from: reciverNum,
          to: searchQuery,
        };
      } else {
        data = {
          message: newMessage,
          from: reciverNum,
          to: senderNum,
        };
      }

      const formData = new FormData();
      formData.append("message", newMessage);
      formData.append("from", reciverNum);
      formData.append("to", senderNum || searchQuery);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      try {
        const actionResult = dispatch(sendMessages(formData, setSelectedFile));
        actionResult.then((result) => {
          if (result?.payload?.success) {
            setValues((prevValues) => ({ ...prevValues, message: "" }));
            setLoading(false);
          }
        });
      } catch (error) {
        toast.error(error.message || "Error while sending sms");
      }
    },
    [
      searchUserForMessage,
      reciverNum,
      searchQuery,
      senderNum,
      selectedFile,
      dispatch,
      setValues,
    ]
  );

  const searchPatientResultsForMessage = useAppSelector(
    (state) => state.clinic.searchPatientResultsForMessage
  );
  const sendMessagesDetails = useAppSelector(
    (state) => state.clinic.sendMessagesDetails
  );
  const handleMediaClick = () => {
    setopenMedia(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError("Please select a file.");
      return;
    }

    const reader = new FileReader();

    const allowedExtensions = [
      "jpeg",
      "jpg",
      "png",
      "doc",
      "pdf",
      "mp3",
      "mp4",
      "mov",
    ];

    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setFileError(
        "Only jpeg, jpg, png, doc, pdf, mp3, mp4, and mov files are allowed."
      );
      return;
    }

    reader.onloadend = () => {
      setSelectedFile(file);
      setValues({ ...values, message: "" });

      if (extension === "jpeg" || extension === "jpg" || extension === "png") {
        setSelectedImage(reader.result);
      } else if (
        extension === "doc" ||
        extension === "pdf" ||
        extension === "mp3" ||
        extension === "mp4" ||
        extension === "mov"
      ) {
      }
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };

    reader.readAsDataURL(file);
    setFileError("");

    setopenMedia(false);
  };

  const socket = useAppSelector((state) => state.socket.socket);

  socket.on("connect_error", (error) => {});

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
    if (openEmoji) {
      setopenMedia(false);
    }
  }, [openEmoji]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        openEmoji
      ) {
        setopenEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEmoji]);

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
      setSearchResults([]);
    }
  }, [searchQuery, clinicId, dispatch]);

  const handleClosePopup = () => {
    setOpenPopup(false);
    setReciverName();
  };

  useEffect(() => {
    const chatDataJSON = localStorage.getItem("contactData");
    if (chatDataJSON) {
      const chatData = JSON.parse(chatDataJSON);
      const newSenderNumber = formatPhoneNumber(senderNum);

      const message = chatData.hasOwnProperty(newSenderNumber)
        ? chatData[newSenderNumber]
        : "";

      setValues((values) => ({
        ...values,
        message,
      }));
    }
  }, [senderNum]);

  const updateChatData = (data) => {
    const contactIds = data?.map((item) => item.contact);

    const contactIdsJSON = JSON.stringify(contactIds);
    localStorage.setItem("contactIds", contactIdsJSON);
  };
  const saveInputValue = (contactId, value) => {
    const contactDataJSON = localStorage.getItem("contactData");
    let contactData = {};
    if (contactDataJSON) {
      contactData = JSON.parse(contactDataJSON);
    }

    contactData[contactId] = value;

    localStorage.setItem("contactData", JSON.stringify(contactData));
  };

  updateChatData(messageList?.data);

  const handleInputChange = (e, number) => {
    const { name, value, selectionStart } = e.target;

    saveInputValue(number, value);

    if (name === "message") {
      let updatedValue = value;

      if (selectedFile && value.startsWith(selectedFile.name)) {
        if (selectionStart === selectedFile.name.length) {
          updatedValue = value.replace(selectedFile.name, "").trim();
        }
      }

      updatedValue = updatedValue.replace(/\s{2,}/g, " ");

      setValues({ ...values, [name]: updatedValue });
    }

    const updatedChatData = messageList?.data?.map((chat) => {
      if (chat.contact === number) {
        return { ...chat, message: updatedValue };
      }
      return chat;
    });

    updateChatData(updatedChatData);
  };

  // const handleSendTextSms = async (e) => {
  //   e.preventDefault();

  //   if (selectedFile && selectedFile.size > 1048576) {
  //     toast.error("File is too large. Maximum allowed size is 1MB");
  //     return;
  //   }

  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("message", values.message);
  //   formData.append("from", reciverNum);
  //   formData.append(
  //     "to",
  //     searchUserForMessage === "messageSearch" ? searchQuery : senderNum
  //   );

  //   if (selectedFile) {
  //     formData.append("file", selectedFile);
  //   }

  //   if (selectedEmoji) {
  //     formData.append("emoji", selectedEmoji);
  //   }

  //   try {
  //     const actionResult = await dispatch(sendMessages(formData));
  //     if (actionResult?.payload?.success) {
  //       setValues({ message: "" });

  //       setSelectedFile(null);
  //       setSelectedEmoji(null);
  //       setLoading(false);
  //       dispatch(fetechGetSMS(formData));
  //     } else {
  //       setLoading(false);
  //       toast.error(
  //         actionResult?.payload?.message || "No content provided for message"
  //       );
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(error.message || "Error while sending sms to this number");
  //   }
  // };

  const handleSendTextSms = async (e) => {
    e.preventDefault();

    if (selectedFile && selectedFile.size > 1048576) {
      toast.error("File is too large. Maximum allowed size is 1MB");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("from", reciverNum);
    formData.append(
      "to",
      searchUserForMessage === "messageSearch" ? searchQuery : senderNum
    );

    if (selectedFile) {
      formData.append("file", selectedFile);
      console.log("Selected file:", selectedFile);
      console.log("File type:", selectedFile.type);
    }

    if (selectedEmoji) {
      formData.append("emoji", selectedEmoji);
    }

    try {
      const actionResult = await dispatch(sendMessages(formData));
      if (actionResult?.payload?.success) {
        setValues({ message: "" });

        setSelectedFile(null);
        setSelectedEmoji(null);
        setLoading(false);
        dispatch(fetechGetSMS(formData));
      } else {
        setLoading(false);
        toast.error(
          actionResult?.payload?.message || "No content provided for message"
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error while sending sms to this number");
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

  useLayoutEffect(() => {
    if (reciverNum !== undefined && senderNum !== undefined) {
      dispatch(fetechGetSMS(data));
    }
  }, [reciverNum, senderNum, sendMessagesDetails]);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [smsList]);

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleMediaUpload = async (media) => {
    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploading(false);
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    handleMediaUpload();
  }, []);

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
              ) : // <div
              //   className={styles.header_img}
              //   style={{ padding: "30px 0 35px 20px" }}
              // >
              //   <div className={styles.title_wrapper}>
              //     <Image src={Images.userIcon} alt="" />
              //   </div>
              //   <div className={styles.title_text}>
              //     {/* <span>Chat with</span> */}
              //     <p>{reciver_name || formatPhoneNumber(senderNum)}</p>
              //   </div>
              // </div>
              null}
            </div>
            <div className={styles.chatting_box_wrapper}>
              <div
                className={styles.chatting_box}
                style={{ minHeight: "600px" }}
              >
                {smsList?.data?.length === 0 ? (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    {" "}
                    No message found
                  </div>
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
                              <div className={styles.title}>{item.text}</div>
                              <div className={styles.time}>
                                {moment(item.createdAt).format("HH:mm")}
                              </div>
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
              <form action="" onSubmit={handleSendTextSms} autocomplete="off">
                <div className={styles.input_box_wrapper}>
                  <input
                    name="message"
                    type="text"
                    placeholder="Message"
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
              ) : // <div className={styles.header_img}>
              //   <div className={styles.title_wrapper}>
              //     {/* <Image src={Images.userIcon} alt="" /> */}
              //     <Image
              //       style={{ borderRadius: "100px" }}
              //       src={Images.default_image}
              //       // width={50}
              //       // height={50}
              //       alt="user icon"
              //     />
              //   </div>
              //   <div className={styles.title_text}>
              //     {/* <span>Chat with</span> */}
              //     <p>{reciver_name || formatPhoneNumber(senderNum)}</p>
              //   </div>
              // </div>
              null}
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
                  const escapedSearchQuery = searchQuery.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                  );

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
              {loading ? (
                <div className={styles.loading}>
                  <SpinnerLoader />
                </div>
              ) : (
                <div
                  ref={chatContainerRef}
                  style={{ overflowY: "auto" }}
                  className={styles.chatting_box}
                >
                  {smsList?.data?.length === 0 ? (
                    <div style={{ textAlign: "center" }}> No message found</div>
                  ) : (
                    <>
                      {smsList?.data.slice().map((item, index) => (
                        <div
                          className={styles.chatting_second_div_wrapper}
                          key={index}
                        >
                          <div className={styles.left_div_wrapper}>
                            {item.direction !== "outbound-api" &&
                              item.from !== reciverNum && (
                                <div className={styles.left_div}>
                                  <div className={styles.title}>
                                    {item.text}
                                  </div>

                                  <div
                                    className={styles.time}
                                    style={{
                                      textAlign: "right",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {moment(item.createdAt).format("HH:mm")}
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className={styles.right_div_wrapper}>
                            {(item.to === senderNum ||
                              item.to === searchQuery) && (
                              <div className={styles.right_div}>
                                <div className={styles.title}>
                                  {item?.media.length > 0 && (
                                    <div className={styles.title}>
                                      {item.media.map((media, index) => (
                                        <div key={index}>
                                          {media.url.match(
                                            /\.(jpeg|jpg|png)$/i
                                          ) && (
                                            <img
                                              src={media.url}
                                              alt=""
                                              width="150px"
                                              height="150px"
                                            />
                                          )}
                                          {media.url.match(
                                            /\.(mp4|mov|avi|wmv)$/i
                                          ) && (
                                            <video
                                              src={media.url}
                                              width="150px"
                                              height="150px"
                                              controls
                                            />
                                          )}
                                          {media.url.match(/\.pdf$/i) && (
                                            <a
                                              href={media.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <Image
                                                src={Images.pdf_img}
                                                alt="PDF file"
                                                style={{
                                                  width: "100px",
                                                  height: "120px",
                                                }}
                                              />
                                              <p
                                                style={{
                                                  color: "blue",
                                                  marginTop: "10px",
                                                }}
                                              >
                                                Click to View PDF
                                              </p>
                                            </a>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {!item?.media.length > 0 && (
                                    <p>{item.text}</p>
                                  )}
                                </div>
                                <div
                                  className={styles.time}
                                  style={{
                                    textAlign: "right",
                                    fontSize: "12px",
                                  }}
                                >
                                  {moment(item.createdAt).format("HH:mm")}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {openEmoji && (
                    <div
                      className={
                        isDarkTheme === "dark"
                          ? styles.darkHeader2
                          : styles.lightHeader2
                      }
                      ref={emojiPickerRef}
                      style={{ marginBottom: "15px" }}
                    >
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                  {!openEmoji && openMedia && (
                    <>
                      {" "}
                      <div className={styles.darkHeader1} ref={mediaPickerRef}>
                        <div className={styles.single_patient_details}>
                          <div
                            className={styles.appointment_list_control}
                            onClick={onRequestIdentificationClick}
                          >
                            <div className={styles.appointment}>
                              <Image src={Images.identification} alt="" />

                              <span>Request Identification</span>
                            </div>
                          </div>

                          <div
                            className={styles.appointment_list_control}
                            onClick={onRequestInsuranceClick}
                          >
                            <div className={styles.appointment}>
                              <Image src={Images.insurance} alt="" />

                              <span>Request Insurance</span>
                            </div>
                          </div>
                          <div className={styles.appointment_list_control}>
                            <div className={styles.appointment}>
                              <Image src={Images.voicerecording} alt="" />

                              <span>Voice Recording</span>
                            </div>
                          </div>
                          <div
                            className={styles.appointment_list_control}
                            onClick={handleMediaClick}
                          >
                            <div className={styles.appointment}>
                              <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileSelect}
                              />
                              <Image src={Images.media} alt="" />

                              <span>Media</span>
                            </div>
                          </div>
                          <div
                            className={styles.appointment_list_control}
                            onClick={() => setopenEmoji(!openEmoji)}
                          >
                            <div className={styles.appointment}>
                              <Image src={Images.emoji} alt="" />

                              <span>Emoji</span>
                            </div>
                          </div>
                          {/* {openEmoji && (
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        )} */}
                          <div className={styles.appointment_list_control}>
                            <div className={styles.appointment}>
                              <Image src={Images.autotexting} alt="" />

                              <span>Auto Texting</span>
                            </div>
                            <div className={styles.appointment_time}>
                              {/* <SwitchToggle /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                // <SpinnerLoader />
              )}

              <form onSubmit={handleSendTextSms}>
                <div className={styles.input_box_wrapper}>
                  <div>
                    <div className={styles.img_wrapper}>
                      {/* <Image
                        src={Images.openchatmedia}
                        alt=""
                        onClick={() => setopenMedia(!openMedia)}
                      /> */}
                      <Add onClick={() => setopenMedia(!openMedia)} />
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
                    placeholder={
                      selectedFile && selectedFile.type.startsWith("image/")
                        ? ""
                        : "Message"
                    }
                    value={values.message || ""}
                    onChange={(e) =>
                      handleInputChange(e, formatPhoneNumber(senderNum))
                    }
                    autocomplete="off"
                  />

                  {selectedFile && (
                    <div className={styles.file_info}>
                      <span>
                        <SendImage />
                      </span>
                      <span>{selectedFile.name}</span>
                      <button onClick={handleRemoveFile}>×</button>
                      <div className={styles.progress_bar}>
                        <div
                          className={styles.progress_line}
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <input
                    id="imageUpload"
                    type="file"
                    accept="doc/* pdf/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />

                  <div className={styles.sendandupload}>
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
