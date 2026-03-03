import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../../../DashboardHeader/subContainer.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import {
  Archivefax,
  recivefaxlist,
  sentfaxlist,
} from "@/app/store/slices/clinicAdminSlices";
import moment from "moment/moment";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import Addfax from "../Addfax/Addfax";
import EfaxAlert from "../EfaxAlert";

const SendFax = () => {
  const [activeTab, setActiveTab] = useState("receviedFax");
  const [openbell, setOpenbell] = useState(false);
  const dispatch = useDispatch();
  const [faxNum, setFaxNum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [pageRange, setPageRange] = useState([1, 2, 3]);
  const [callAlert, setCallAlert] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDownload = (fileUrl) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.target = "_blank";
    anchor.download = true;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const sentfaxlistdata = useAppSelector(
    (state) => state?.clinic?.sentfaxlistdata?.data
  );

  const recordingfile = useAppSelector(
    (state) =>
      state?.clinic?.sentfaxlistdata?.data[0]?.payload?.original_media_url
  );

  const handlebellClose = () => {
    setOpenbell(false);
  };

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  useEffect(() => {
    if (singleClinicData) {
      setFaxNum(`${singleClinicData?.data?.fax_phone}`);
    }
  }, [singleClinicData]);

  useEffect(() => {
    if (faxNum !== undefined) {
      const efaxData = {
        from: faxNum,
      };
      dispatch(sentfaxlist({ efaxData, currentPage, limit }));
    }
  }, [faxNum, currentPage, limit]);

  const totalPages = sentfaxlistdata
    ? Math.ceil(sentfaxlistdata.length / limit)
    : 0;

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
  const data = {
    archive: true,
  };

  const handledeletefax = (faxId) => {
    dispatch(Archivefax({ faxId, data }));
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
              <span>Sent</span>
            </div>
            <div className={styles.sub_title}>
              <div
                className={` ${styles.receivedFax} ${
                  activeTab === "addfax" ? styles.activeClass : ""
                }`}
                onClick={() => setOpenbell(!openbell)}
              >
                <Image src={Images.plus_icon} alt="" /> SEND A FAX
              </div>
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
                        <th scope="col">File Name</th>
                        <th scope="col">Fax Number</th>
                        <th scope="col">Date and Time</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody
                      id="clinicListTable"
                      className={styles.card_container_data}
                    >
                      {sentfaxlistdata?.length > 0 ? (
                        sentfaxlistdata.map((item, index) => (
                          <tr key={index}>
                            <td scope="row">{index + 1}</td>

                            <td>
                              {item?.payload?.original_media_url
                                ?.substring(
                                  item?.payload?.original_media_url?.lastIndexOf(
                                    "/"
                                  ) + 1
                                )
                                ?.slice(0, 100)}
                              &nbsp; &nbsp;
                              <Image
                                src={Images.pdf_icon}
                                alt="pdf icon"
                                onClick={() => {
                                  window.open(
                                    item?.payload?.original_media_url,
                                    "_blank"
                                  );
                                }}
                                style={{ cursor: "pointer" }}
                              />
                              &nbsp;&nbsp;
                              <Image
                                onClick={() =>
                                  handleDownload(
                                    item.payload.original_media_url
                                  )
                                }
                                src={Images.Download_pdf}
                                alt="download pdf icon"
                              />
                              &nbsp;&nbsp;
                              <Image
                                src={Images.mail_icon}
                                alt="download pdf icon"
                                onClick={() => setCallAlert(true)}
                              />
                            </td>

                            <td>
                              {" "}
                              {formatPhoneNumber(item?.payload?.to || "--")}
                            </td>
                            <td>
                              {new Date(item?.occurred_at || "--")
                                .toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "/")}
                              &nbsp; &nbsp;
                              {new Date(item?.occurred_at).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </td>
                            <td>
                              <span style={{ cursor: "pointer" }}>
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.deleteIcon}
                                  alt=""
                                  onClick={() => handledeletefax(item._id)}
                                />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {sentfaxlistdata?.data?.length > 0 && (
                  <div className={styles.pagination}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                      {isDarkTheme === "dark" ? (
                        <Image src={Images.paginationLeft}></Image>
                      ) : (
                        <Image src={Images.paginationLeft}></Image>
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
                        <Image src={Images.paginationright}></Image>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openbell && (
        <RightCustomModal
          isOpen={openbell}
          onClose={handlebellClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <Addfax setOpenbell={setOpenbell} />
        </RightCustomModal>
      )}
      {callAlert && (
        <EfaxAlert setCallAlert={setCallAlert} recordingfile={recordingfile} />
      )}
    </>
  );
};

export default SendFax;
