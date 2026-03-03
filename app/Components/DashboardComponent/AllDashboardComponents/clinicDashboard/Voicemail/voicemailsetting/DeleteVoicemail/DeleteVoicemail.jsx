import React, { useEffect, useState } from "react";
import styles from "../../../../../DashboardHeader/subContainer.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteVoicemail,
  fetchGetVioceMail,
} from "@/app/store/slices/clinicAdminSlices";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import { toast } from "react-toastify";

const DeleteVoicemail = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const voicemailList = useSelector(
    (state) => state.clinic.fetchDeleteVoicemailData
  );
  const totalPages = voicemailList?.pagination?.totalPages;
  const singleClinicData = useSelector((state) => state.admin.singleClinicData);
  const from = useSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_phone
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    setLoading(true);
    if (singleClinicData) {
      dispatch(
        fetchDeleteVoicemail({
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
              <span>Deleted Voicemail</span>
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
    </>
  );
};

export default DeleteVoicemail;
