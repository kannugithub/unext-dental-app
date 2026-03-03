import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteVoicemail,
  fetchGetVioceMail,
} from "@/app/store/slices/clinicAdminSlices";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import { toast } from "react-toastify";
import EfaxAlert from "../eFax/EfaxAlert";
import { useAppSelector } from "@/app/store/lib/hooks";

const Voicemail = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [callAlert, setCallAlert] = useState(false);

  const dispatch = useDispatch();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const voicemailList = useSelector((state) => state.clinic.voicemailList);
  const totalPages = voicemailList?.pagination?.totalPages;
  const singleClinicData = useSelector((state) => state.admin.singleClinicData);
  const from = useSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_phone
  );

  const recordingfile = useAppSelector(
    (state) => state?.clinic?.voicemailList?.data[0]?.voice_mail?.recording_url
  );

  console.log(voicemailList, "voicemailList");
  console.log(recordingfile, "recordingfile");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    setLoading(true);
    if (singleClinicData) {
      dispatch(
        fetchGetVioceMail({
          clinicId: singleClinicData?.data?._id,
          from,
          page: currentPage,
          limit,
        })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [singleClinicData, from, currentPage, limit, dispatch]);

  const handlePlayAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDeleteVoicemail = async (id) => {
    try {
      const actionResult = await dispatch(DeleteVoicemail(id));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      toast.error(error);
    }
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
              <span>Voicemail</span>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"}
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className={styles.card_container_heading}>
                      <tr>
                        <th scope="col">S No.</th>
                        <th scope="col">Number</th>
                        <th scope="col">Date</th>
                        <th style={{ textAlign: "end" }} scope="col">
                          Recording
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      id="clinicListTable"
                      className={styles.card_container_data}
                    >
                      {voicemailList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="5">No data found</td>
                        </tr>
                      ) : (
                        voicemailList?.data.map((item, key) => (
                          <tr key={key}>
                            <td scope="row">
                              {(currentPage - 1) * limit + key + 1}
                            </td>
                            <td>
                              {formatPhoneNumber(
                                item?.voice_mail?.from || "--"
                              )}
                            </td>
                            <td>
                              {new Date(item?.voice_mail?.createdAt || "--")
                                .toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "/")}
                              &nbsp; &nbsp;
                              {new Date(
                                item?.voice_mail?.createdAt
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </td>
                            <td
                              style={{
                                textAlign: "end",
                                color: "#409EEE",
                                cursor: "pointer",
                              }}
                            >
                              <Image
                                src={Images.play_icon}
                                onClick={() =>
                                  handlePlayAudio(
                                    item?.voice_mail?.recording_url
                                  )
                                }
                              ></Image>
                              &nbsp;&nbsp;
                              <span style={{ color: "#409EEE" }}>
                                Voicefile
                              </span>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <div
                                className={styles.action_icons}
                                style={{
                                  display: "flex",

                                  cursor: "pointer",
                                }}
                              >
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.voice_download}
                                  alt=""
                                />
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.voice_call}
                                  alt=""
                                />
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.voice_mail}
                                  alt=""
                                  onClick={() => setCallAlert(true)}
                                />
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.deleteIcon}
                                  alt=""
                                  onClick={() =>
                                    handleDeleteVoicemail(item?.voice_mail?._id)
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {voicemailList?.data?.length > 0 && (
                  <div className={styles.pagination}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                      {isDarkTheme === "dark" ? (
                        <Image src={Images.paginationLeft}></Image>
                      ) : (
                        <Image src={Images.LightpaginationLeft}></Image>
                      )}
                      Prev
                    </button>
                    <span>
                      {pageNumbers.map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={
                            currentPage === pageNumber ? styles.active : ""
                          }
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </span>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      {isDarkTheme === "dark" ? (
                        <Image src={Images.paginationright}></Image>
                      ) : (
                        <Image src={Images.Lightpaginationright}></Image>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {callAlert && (
        <EfaxAlert setCallAlert={setCallAlert} recordingfile={recordingfile} />
      )}
    </>
  );
};

export default Voicemail;
