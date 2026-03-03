import React, { useEffect, useState } from "react";
import styles from "./singleOffice.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import MonthlyPlan from "../../../../clinicDashboard/Billing/MonthlyPlan/MonthlyPlan";
import PaymentMethods from "../../../../clinicDashboard/Billing/PaymentMethods/PaymentMethods";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleOfficeDetails,
  getSingleUserDetails,
} from "@/app/store/slices/superAdminSlices";
import moment from "moment";
import { unwrapResult } from "@reduxjs/toolkit";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import CardDetailsPopup from "@/app/Components/common/cardDetailsPopup/CardDetailsPopup";
import PoupAlert from "../../../AlertPopup/PoupAlert";

const OfficeSingleDetails = ({
  setSingleOfficeView,
  singleOfficeView,
  savedPaymentList,
  type,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [dataloading, setDataLoading] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const getSingleOfficeDetailsData = useSelector(
    (state) => state.admin.getSingleOfficeDetailsData
  );
  const fetchAddCardDetails = useSelector(
    (state) => state.clinic.fetchAddCardDetails
  );
  const fetcgDeleteCardDetails = useSelector(
    (state) => state.clinic.fetcgDeleteCardDetails
  );
  const dispatch = useDispatch();

  const closePopUp = () => {
    setOpenCard(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleOpen = (id) => {
    setCardId(id);
    setDeletePopup(true);
  };

  useEffect(() => {
    const fetchSingleOfficeData = async () => {
      setDataLoading(true);
      try {
        const actionResult = await dispatch(
          getSingleOfficeDetails(singleOfficeView)
        );
        const response = actionResult?.payload;
        if (response?.success) {
          setDataLoading(false);
        }
      } catch (error) {
        setDataLoading(false);
        toast.error(error.message);
      }
    };
    fetchSingleOfficeData();
  }, [fetchAddCardDetails, fetcgDeleteCardDetails]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.office_information_container}>
          <div className={styles.office_information}>
            <div
              className={styles.backimages}
              onClick={() => setSingleOfficeView(null)}
            >
              <Image
                src={
                  isDarkTheme === "dark"
                    ? Images?.whitebackIcon
                    : Images?.blackbackIcon
                }
                alt="back icon"
              />
            </div>
            <div className={styles.office_info}>
              {" "}
              {type === "userList" ? "User" : "Office"} Information
            </div>
          </div>
          {dataloading ? (
            <div className={styles.loader_container}>
              <SpinnerLoader />
            </div>
          ) : (
            <>
              <div className={styles.user_account}>
                user account information
              </div>
              <div className={styles.account_info}>
                <div className={styles.name_box}>
                  <div className={styles.name_title_tag}>Full Name</div>
                  <div className={styles.name_contant_tag}>
                    {getSingleOfficeDetailsData?.data?.employess?.[0]?.name}
                  </div>
                </div>
                <div className={styles.name_box}>
                  <div className={styles.name_title_tag}>Email</div>
                  <div className={styles.name_contant_tag}>
                    {getSingleOfficeDetailsData?.data?.employess?.[0]?.email}
                  </div>
                </div>
                <div className={styles.name_box}>
                  <div className={styles.name_title_tag}>Phone Number</div>
                  <div className={styles.name_contant_tag}>
                    {getSingleOfficeDetailsData?.data?.employess?.[0]
                      ?.p_number || "--"}
                  </div>
                </div>
              </div>
              <div className={styles.subscription_box}>
                <div className={styles.subscription_plan}>
                  subscription Plan
                </div>
                <MonthlyPlan
                  getSingleOfficeDetailsData={getSingleOfficeDetailsData}
                />
              </div>
              <div className={styles.billing_payment}>
                <div className={styles.office_billing}>
                  <div className={styles.subscription_plan}>
                    Billing and payment information
                  </div>
                  <div className={styles.card_add}>
                    <button onClick={() => setOpenCard(true)}>
                      <Image src={Images.plus_icon} alt="" />
                      &nbsp; <span> ADD A PAYMENT METHOD</span>
                    </button>
                  </div>
                </div>
                <div className={isDarkTheme === "dark" ? "card2" : "card2"}>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className={styles.card_container_heading}>
                          <tr>
                            <th scope="col">Card Number </th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Billing Address</th>
                            <th scope="col">zip code</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          id="clinicListTable"
                          className={styles.card_container_data}
                        >
                          {getSingleOfficeDetailsData?.data?.subsc_plan
                            ? [...getSingleOfficeDetailsData?.data?.subsc_plan]
                                .sort((a, b) => (b.is_primary ? 1 : -1))
                                .map((item, key) => (
                                  <tr key={key}>
                                    <td>
                                      *** *** {item?.last4}{" "}
                                      {item?.is_primary ? (
                                        <span
                                          className={styles.card_primary}
                                          style={{ color: "#409EEE" }}
                                        >
                                          Primary
                                        </span>
                                      ) : (
                                        ""
                                      )}{" "}
                                    </td>
                                    <td>
                                      {item?.card_expmonth}/{item?.card_expyear}
                                    </td>
                                    <td>
                                      {item?.billing_address?.country || "--"}{" "}
                                    </td>
                                    <td>
                                      {item?.billing_address?.postal_code ||
                                        "--"}
                                    </td>
                                    <td>
                                      <span className={styles.delete_icon}>
                                        <Image
                                          src={Images.deleteIcon}
                                          alt="delete icon"
                                          onClick={() => handleOpen(item?._id)}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.billing_payment}>
                <div className={styles.office_billing}>
                  <div className={styles.subscription_plan}>
                    Transaction History
                  </div>
                </div>
                <div className={isDarkTheme === "dark" ? "card2" : "card2"}>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className={styles.card_container_heading}>
                          <tr>
                            <th scope="col">Transaction ID </th>
                            <th scope="col">Invoice Date</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody
                          id="clinicListTable"
                          className={styles.card_container_data}
                        >
                          {getSingleOfficeDetailsData?.data?.transaction_history?.map(
                            (item, key) => (
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
                                  {item?.amount || "--"}{" "}
                                  {item?.currency || "--"}
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
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {openCard && (
        <RightCustomModal
          isOpen={openCard}
          onClose={closePopUp}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <CardDetailsPopup
            closePopUp={closePopUp}
            setOpenCard={setOpenCard}
            getSingleOfficeDetailsData={getSingleOfficeDetailsData}
          />
        </RightCustomModal>
      )}
      {deletePopup && (
        <PoupAlert
          setCouponAlert={setDeletePopup}
          couponAlert={deletePopup}
          deleteType="deleteCardFromSuperAdmin"
          selectedCouponId={cardId}
          type="deleteCardFromSuperAdmin"
        />
      )}
    </>
  );
};

export default OfficeSingleDetails;
