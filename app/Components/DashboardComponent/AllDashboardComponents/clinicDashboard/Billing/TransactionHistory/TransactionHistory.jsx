import React, { useEffect, useState, useRef } from "react";
import styles from "./transaction.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { fetchtransactionHistory } from "@/app/store/slices/clinicAdminSlices";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";

const TransactionHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const [clinicId, setClinicId] = useState();
  const [openMonth, setOpenMonth] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const transactionHistoryList = useAppSelector(
    (state) => state.clinic.transactionHistoryList
  );
  const updateSubscriptionData = useAppSelector(
    (state) => state.clinic.updateSubscriptionData
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      dispatch(fetchtransactionHistory(clinicId));
    }
  }, [clinicId, updateSubscriptionData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenMonth(false);
      }
    };

    if (openMonth) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMonth]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashSub_blue}>
          <div className={styles.compo_name}>
            <span>Bills & Payment</span>
          </div>
          <div className={styles.subCompBtns}>
            <button
              ref={buttonRef}
              className={styles.dash_btn_new}
              onClick={() => setOpenMonth(!openMonth)}
            >
              <Image src={Images.blue_calender} alt="" /> &nbsp; Past 3 Months
            </button>
          </div>
        </div>
        <div className={styles.dashSub_blue1}>
          <div>
            <span>
              Invoices provide a summary of your charges and instructions to
              make payments. Some are generated within 24 hours of buying an
              individual item, others are generated at the end of the billing
              period and include all items from that billing period.
            </span>
          </div>
        </div>
        <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2 mx-4"}>
          <div className="card-body">
            {transactionHistoryList?.data ? (
              <div className="table-responsive">
                <table className="table">
                  <thead className={styles.card_container_heading}>
                    <tr>
                      <th scope="col">Transaction id </th>
                      <th scope="col">Invoice Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Download PDF</th>
                    </tr>
                  </thead>
                  <tbody
                    id="clinicListTable"
                    className={styles.card_container_data}
                  >
                    {transactionHistoryList?.data?.map((item, key) => (
                      <tr key={key}>
                        <td>{item?.transactionId}</td>
                        <td>
                          {item?.created
                            ? moment(item.expirationDate).format("DD MMMM YYYY")
                            : ""}
                        </td>
                        <td style={{ textTransform: "uppercase" }}>
                          {item?.amount ? "$" : ""} {item?.amount || "--"}
                        </td>
                        <td>
                          <span className={styles.success_tag}>
                            {item.status === "succeeded" ? (
                              <p>Success</p>
                            ) : (
                              <p style={{ color: "red" }}>Fail</p>
                            )}
                          </span>
                        </td>
                        <td style={{ textTransform: "uppercase" }}>
                          <a
                            style={{
                              color: "#409EEE",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            href={item?.receipt_url}
                            target="_blank"
                          >
                            Download invoice
                          </a>
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
        {openMonth && (
          <div ref={popupRef}>
            <div className={styles.darkHeader2}>
              <div className={styles.appointment_list_control}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 4.5L6.75 12.75L3 9"
                    stroke="#409EEE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                &nbsp; Past 3 months
              </div>
              <div className={styles.appointment_list_control}>
                Past 6 months
              </div>
              <div className={styles.appointment_list_control1}>
                Specify Date Range
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
