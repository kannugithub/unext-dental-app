import React, { useState, useRef, useEffect } from "react";
import styles from "./Transaction.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useAppSelector } from "@/app/store/lib/hooks";
import {
  fetchtransactionHistory,
  fetchTransctionsData,
} from "@/app/store/slices/superAdminSlices";
import { useDispatch } from "react-redux";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { unparse } from "papaparse";
import { Link } from "react-scroll";
import CalendarRange from "@/app/Components/common/CalendarPopup/CalendarRange";
import moment from "moment/moment";
import useOutsideClick from "../OutSideClick/useOutsideClick";
import { unwrapResult } from "@reduxjs/toolkit";

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [openRangeCalender, setOpenRangeCalender] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Past 3 months");
  const [exportVisible, setExportVisible] = useState(true);
  const [openlogout, setOpenlogout] = useState(false);
  const [startMonth, setStartMonth] = useState({});
  const [endMonth, setEndMonth] = useState({});
  const [selectedOption, setSelectedOption] = useState("10");
  const [year, setYear] = useState(2024);
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const transactionTableDataList = useAppSelector(
    (state) => state.admin.getTransactionHistory
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const transactionData = transactionTableDataList?.result || [];
  const itemsToShow = parseInt(selectedOption, 10);
  const dataToShow = transactionData.slice(0, itemsToShow);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        let result;
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage);
        queryParams.append("limit", itemsToShow);
        if (!debouncedSearchInput) {
          if (currentPage && limit) {
            result = await dispatch(fetchTransctionsData(queryParams));
            queryParams.append("start_year", startYear);
            queryParams.append("end_year", endYear);
            queryParams.append("start_month", startMonth?.number);
            queryParams.append("end_month", endMonth?.number);
            if (startYear || endYear || startYear <= endYear) {
              result = await dispatch(fetchTransctionsData(queryParams));
            }
          }
          const { response } = unwrapResult(result);
          if (response) {
            setDataLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataLoading(false);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [
    dispatch,
    currentPage,
    itemsToShow,
    startYear,
    endYear,
    startMonth,
    endMonth,
    debouncedSearchInput,
  ]);

  useEffect(() => {
    const fetchtransctions = async () => {
      setDataLoading(true);
      try {
        let actionResult;
        const queryParams = new URLSearchParams();
        queryParams.append("clinic_name", debouncedSearchInput);
        if (debouncedSearchInput) {
          actionResult = await dispatch(fetchTransctionsData(queryParams));
        } else {
          actionResult = await dispatch(fetchTransctionsData(queryParams));
        }
        const { success } = unwrapResult(actionResult);
        if (success) {
          setDataLoading(false);
        }
      } catch (error) {
        setDataLoading(false);
      } finally {
        setDataLoading(false);
      }
    };
    if (debouncedSearchInput) {
      fetchtransctions();
    }
    fetchtransctions();
  }, [dispatch, debouncedSearchInput]);

  useOutsideClick(popupRef, () => {
    if (openCalender) {
      setOpenCalender(false);
    } else if (openRangeCalender) {
      setOpenRangeCalender(false);
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  // export data
  const handleExportButtonClick = async () => {
    setDataLoading(true);
    try {
      const actionResult = await dispatch(fetchTransctionsData());
      const { result } = actionResult.payload;
      if (result) {
        setDataLoading(false);
      }
      const csv = unparse(result);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transction_list.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setDataLoading(false);
      toast.error("An error occurred while exporting the data.");
    }
  };
  // Search transctions data

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
    if (newValue === "") {
      setDebouncedSearchInput("");
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  // Date range

  const handleDateRange = (range) => {
    if (range === "Specify Date Range") {
      setSelectedRange(range);
      setOpenRangeCalender(true);
      setExportVisible(false);
      setOpenCalender(false);
    } else {
      setSelectedRange(range);
      setOpenCalender(true);
      setOpenRangeCalender(false);
      setExportVisible(true);

      const checkboxes = document.getElementsByName(range);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    }
  };

  const closePopupHandler = (range) => {
    if (range === "Specify Date Range") {
      setSelectedRange("Past 3 months");
      setOpenCalender(false);
      setOpenRangeCalender(false);
      setExportVisible(true);
    }
  };
  //outside
  useOutsideClick(popupRef, closePopupHandler);

  // option function

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getOptionStyle = (value) => {
    return value === selectedOption ? { backgroundColor: "", color: "" } : {};
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
              <span>Transactions</span>
              <div className={styles.header_inp_box}>
                {isDarkTheme === "dark" ? (
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.457 10.4288C14.043 9.62721 14.3867 8.67612 14.3867 7.6537C14.3867 4.79705 11.7266 2.48047 8.44531 2.48047C5.16016 2.48047 2.5 4.79705 2.5 7.6537C2.5 10.5104 5.16016 12.8269 8.44141 12.8269C9.63281 12.8269 10.7422 12.5212 11.6719 11.9981L11.9414 11.8351L16.1836 15.524L17.5 14.3589L13.2617 10.67L13.457 10.4288ZM11.7734 4.76308C12.6602 5.53414 13.1484 6.55995 13.1484 7.65031C13.1484 8.74066 12.6602 9.76648 11.7734 10.5375C10.8867 11.3086 9.70703 11.7332 8.45312 11.7332C7.19922 11.7332 6.01953 11.3086 5.13281 10.5375C4.24609 9.76648 3.75781 8.74066 3.75781 7.65031C3.75781 6.55995 4.24609 5.53414 5.13281 4.76308C6.01953 3.99202 7.19922 3.56743 8.45312 3.56743C9.70703 3.56743 10.8867 3.99202 11.7734 4.76308Z"
                      fill="#409EEE"
                    />
                  </svg>
                ) : (
                  <Image src={Images.searchIcon} alt="search icon" />
                )}
                <input
                  type="text"
                  name=""
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className={styles.subCompBtns}>
              <div className={styles.select_option}>
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value="10" style={getOptionStyle("10")}>
                    10
                  </option>
                  <option value="20" style={getOptionStyle("20")}>
                    20
                  </option>
                  <option value="30" style={getOptionStyle("30")}>
                    30
                  </option>
                </select>
              </div>
              {exportVisible && (
                <button onClick={handleExportButtonClick}>
                  <Image src={Images.export_icon} alt="" /> &nbsp; EXPORT
                </button>
              )}

              <div className={styles.dash_btn}>
                {isDarkTheme === "dark" ? (
                  <Image
                    src={Images.calendar}
                    onClick={() => {
                      if (
                        transactionTableDataList?.user?.role === "Clinic Admin"
                      ) {
                        setOpenlogout(!openlogout);
                      } else {
                        setOpenCalender(!openCalender);
                      }
                    }}
                  ></Image>
                ) : (
                  <Image
                    src={Images.calendar}
                    onClick={() => {
                      if (
                        transactionTableDataList?.user?.role === "Clinic Admin"
                      ) {
                        setOpenlogout(!openlogout);
                      } else {
                        setOpenCalender(!openCalender);
                      }
                    }}
                  ></Image>
                )}
                {openCalender && !openRangeCalender && (
                  <div
                    ref={popupRef}
                    className={
                      isDarkTheme === "dark"
                        ? styles.darkHeader2
                        : styles.lightHeader2
                    }
                  >
                    <Link
                      href="/user-setting"
                      style={{ textDecoration: "none" }}
                    >
                      <div className={styles.appointment_list_control}>
                        <button
                          onClick={() => handleDateRange("Past 3 months")}
                        >
                          {selectedRange === "Past 3 months" && (
                            <svg
                              width="14"
                              height="11"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13 1.5L4.75 9.75L1 6"
                                stroke="#409EEE"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          )}
                          Past 3 months
                        </button>
                      </div>
                    </Link>
                    <div className={styles.top_border}></div>
                    <div className={styles.appointment_list_control}>
                      <button onClick={() => handleDateRange("Past 6 months")}>
                        {selectedRange === "Past 6 months" && (
                          <svg
                            width="14"
                            height="11"
                            viewBox="0 0 14 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1.5L4.75 9.75L1 6"
                              stroke="#409EEE"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        )}
                        Past 6 months
                      </button>
                    </div>
                    <div className={styles.top_border}></div>
                    <div className={styles.appointment_list_control}>
                      <button
                        onClick={() => handleDateRange("Specify Date Range")}
                      >
                        {selectedRange === "Specify Date Range" && (
                          <svg
                            width="14"
                            height="11"
                            viewBox="0 0 14 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1.5L4.75 9.75L1 6"
                              stroke="#409EEE"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        )}
                        Specify Date Range
                      </button>
                    </div>
                  </div>
                )}
                <p onClick={() => closePopupHandler(selectedRange)}>
                  {selectedRange}
                </p>
                {openRangeCalender && (
                  <div className={styles.date_range_month} ref={popupRef}>
                    <div className={styles.selected_montth}>
                      <div className={styles.selected_montth_item}>
                        {startMonth?.fullName} {year}
                      </div>
                      <div className={styles.selected_montth_item}>
                        {endMonth?.fullName} {year}
                      </div>
                    </div>
                    <CalendarRange
                      setStartMonth={setStartMonth}
                      startMonth={startMonth}
                      endMonth={endMonth}
                      setEndMonth={setEndMonth}
                      year={year}
                      setYear={setYear}
                      setEndYear={setEndYear}
                      setStartYear={setStartYear}
                      endYear={endYear}
                      startYear={startYear}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {dataLoading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : (
            <div className={styles.card_container}>
              <div
                className={
                  isDarkTheme === "dark" ? styles.card2 : styles.cardlight
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table ">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">INVOICE DATE</th>
                          <th scope="col">TOTAL AMOUNT</th>
                          <th scope="col">STATUS</th>
                          <th scope="col">OFFICE NAME </th>
                          <th scope="col">DOWNLOAD</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {dataToShow?.data?.map((item, key) => (
                          <tr key={key}>
                            <td>{item?.transactionId}</td>
                            <td>
                              {item?.created
                                ? moment(item.expirationDate).format(
                                    "DD MMMM YYYY"
                                  )
                                : ""}
                            </td>
                            <td style={{ textTransform: "uppercase" }}>
                              {item?.currency} {item?.amount}
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
                          </tr>
                        ))}
                        {dataToShow && dataToShow?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No data found
                            </td>
                          </tr>
                        ) : (
                          dataToShow?.map((item) => (
                            <tr>
                              <td>{item.transactions.transactionId}</td>
                              <td>
                                {item?.transactions.created
                                  ? moment(item?.date).format(
                                      "MMMM Do YYYY, h:mm a"
                                    )
                                  : ""}
                              </td>

                              <td>${item.transactions.amount}</td>
                              <td>
                                <span className={styles.success_tag}>
                                  {item.transactions.status === "succeeded" ? (
                                    <p>Success</p>
                                  ) : (
                                    <p style={{ color: "red" }}>Fail</p>
                                  )}
                                </span>
                              </td>
                              <td>{item.clinicData.clinic_name}</td>
                              <td>
                                <a
                                  href={item.transactions.receipt_url}
                                  target="_blank"
                                >
                                  Download
                                </a>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* {dataToShow?.length === 10 && (
                    <div className={styles.pagination}>
                      <span>
                        {pageNumbers.map((pageNumber, index) => {
                          if (
                            index < 3 ||
                            pageNumber === totalPages ||
                            pageNumber === currentPage ||
                            pageNumber === currentPage - 1 ||
                            pageNumber === currentPage + 1
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={
                                  currentPage === pageNumber
                                    ? styles.active
                                    : ""
                                }
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (index === 3 && totalPages > 6) {
                            return <span key={pageNumber}>...</span>;
                          }
                        })}
                      </span>
                      <button onClick={prevPage} disabled={currentPage === 1}>
                        {isDarkTheme === "dark" ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5 5L7.5 10L12.5 15"
                              stroke="white"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ) : (
                          <Image src={Images.paginationLefticon}></Image>
                        )}
                      </button>
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                      >
                        {isDarkTheme === "dark" ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.5 15L12.5 10L7.5 5"
                              stroke="white"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ) : (
                          <Image src={Images.paginationRighticon}></Image>
                        )}
                      </button>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transaction;
