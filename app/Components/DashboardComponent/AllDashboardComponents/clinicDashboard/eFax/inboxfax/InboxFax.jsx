import React, { useEffect, useState } from "react";

import styles from "../../../../DashboardHeader/subContainer.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";

import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { recivefaxlist } from "@/app/store/slices/clinicAdminSlices";
import moment from "moment/moment";

import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import Addfax from "../Addfax/Addfax";

const InboxFax = () => {
  const [activeTab, setActiveTab] = useState("receviedFax");
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const dispatch = useDispatch();
  const [faxNum, setFaxNum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [openbell, setOpenbell] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleFaxTab = (tab) => {
    setActiveTab(tab);
  };

  const handlebellClose = () => {
    setOpenbell(false);
  };

  const recivefaxlistdata = useAppSelector(
    (state) => state?.clinic?.recivefaxlistdata?.data
  );

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  useEffect(() => {
    if (singleClinicData) setFaxNum(`${singleClinicData?.data?.fax_phone}`);
  }, [singleClinicData]);

  useEffect(() => {
    if (faxNum !== undefined) {
      const efaxData = {
        to: faxNum,
      };
      dispatch(recivefaxlist({ efaxData, currentPage, limit }));
    }
  }, [faxNum, currentPage, limit]);

  const totalPages = useAppSelector(
    (state) => state?.clinic?.recivefaxlistdata?.pagination?.total_pages
  );

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

  // Generate page numbers
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
              <span>Inbox</span>
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
                      {recivefaxlistdata?.length > 0 ? (
                        recivefaxlistdata.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {item?.payload?.original_media_url?.substring(
                                item?.payload?.original_media_url?.lastIndexOf(
                                  "/"
                                ) + 1
                              )}
                            </td>
                            <td>
                              {formatPhoneNumber(item?.payload?.to || "--")}
                            </td>
                            <td>
                              {moment(item?.occurred_at).format("MMM Do YY")}
                            </td>
                            <td>
                              <span className={styles.share_icon}>
                                <Image src={Images.ShareIcon} alt="" />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
    </>
  );
};

export default InboxFax;
