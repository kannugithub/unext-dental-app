import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import style from "./billing.module.scss";
import MonthlyPlan from "./MonthlyPlan/MonthlyPlan";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import AddNewCard from "@/app/Components/common/addNewCard/AddNewCard";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { fetchgetSavedPayments } from "@/app/store/slices/clinicAdminSlices";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import CardDetailsPopup from "@/app/Components/common/cardDetailsPopup/CardDetailsPopup";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import SwitchToggle from "@/app/Components/common/SwitchToggle/SwitchToggle";
import CardPrimaryPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/CardPrimaryPopup";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";

const UserInformation = () => {
  const [openCard, setOpenCard] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [isPrimaryCard, setIsPrimaryCard] = useState(false);
  const [toggleStates, setToggleStates] = useState({});
  const [clickedItemId, setClickedItemId] = useState(null);
  const [clinicId, setClinicId] = useState();

  const dispatch = useDispatch();
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const cancelSubscriptionPlanData = useAppSelector(
    (state) => state.authWeb.cancelSubscriptionPlanData
  );

  console.log("isPrimaryCard", isPrimaryCard);
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const getPrimaryCardData = useAppSelector(
    (state) => state.clinic.getPrimaryCardData
  );
  const savedPaymentList = useAppSelector(
    (state) => state.clinic.savedPaymentList
  );
  const fetcgDeleteCardDetails = useAppSelector(
    (state) => state.clinic.fetcgDeleteCardDetails
  );
  const fetchAddCardDetails = useAppSelector(
    (state) => state.clinic.fetchAddCardDetails
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (userInfoData) {
      setUserId(userInfoData?.user?._id);
      dispatch(fetchgetSavedPayments(clinicId));
    } else {
      dispatch(fetchgetSavedPayments(clinicId));
    }
  }, [
    userId,
    fetcgDeleteCardDetails,
    userInfoData,
    fetchAddCardDetails,
    getPrimaryCardData,
    clinicId,
    dispatch,
  ]);

  const openPopUp = () => {
    setOpenCard(true);
  };
  const closePopUp = () => {
    setOpenCard(false);
  };

  const closePrimaryPopUp = () => {
    setIsPrimaryCard(false);
  };

  const handleOpen = (id) => {
    setCardId(id);
    setDeletePopup(true);
  };

  const handleClose = () => setDeletePopup(false);

  const handleToggle = (id, isChecked) => {
    setToggleStates((prevState) => ({ ...prevState, [id]: isChecked }));
    setClickedItemId(id);
    if (isChecked) {
      setIsPrimaryCard(true);
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
              <span>Subscription</span>
            </div>
            {/* <div className={styles.compo_name}>
              Billing info and payment information
            </div> */}
            {/* <div className={styles.subCompBtns}>
              <button onClick={openPopUp}>Add New Card</button>
            </div> */}
          </div>
          {/* <div className={styles.card_container}>
            <div
              className={isDarkTheme === "dark" ? "card1 mx-4" : "card  mx-4"}
            >
              <div className="card-body">
                {savedPaymentList?.data ? (
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
                        {savedPaymentList?.data
                          ? [...savedPaymentList.data]
                              .sort((a, b) => (b.is_primary ? 1 : -1))
                              .map((item, key) => (
                                <tr key={key}>
                                  <td>
                                    **** **** {item?.last4}{" "}
                                    {item?.is_primary ? (
                                      <span className={styles.card_primary}>
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
                                    {item?.billing_address?.postal_code || "--"}
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "flex-end",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {item?.is_primary ? (
                                        ""
                                      ) : (
                                        <SwitchToggle
                                          isChecked={
                                            toggleStates[item?._id] || false
                                          }
                                          onToggle={(isChecked) =>
                                            handleToggle(item?._id, isChecked)
                                          }
                                          id={item._id}
                                        />
                                      )}

                                      <Image
                                        src={Images.deleteIcon}
                                        alt=""
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
                ) : (
                  <div className="d-flex justify-content-center">
                    <SpinnerLoader />
                  </div>
                )}
              </div>
            </div>
          </div> */}
          <div className={styles.card_container}>
            <MonthlyPlan />
          </div>
          {/* <div className={styles.card_container}>
            <TransactionHistory userId={userId} />
          </div> */}
        </div>
      </div>

      {deletePopup && (
        <RightCustomModal
          isOpen={deletePopup}
          onClose={handleClose}
          shouldCloseOnOutsideClick={true}
        >
          <ConfirmationPopup
            cardId={cardId}
            userID={userId}
            setDeletePopup={setDeletePopup}
            deleteType="deleteCard"
          />
        </RightCustomModal>
      )}

      {openCard && (
        <RightCustomModal
          isOpen={openCard}
          onClose={closePopUp}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <CardDetailsPopup
            closePopUp={closePopUp}
            userId={userId}
            setOpenCard={setOpenCard}
            // deleteType="staffDelete"
          />
        </RightCustomModal>
      )}
      {isPrimaryCard && (
        <RightCustomModal
          isOpen={isPrimaryCard}
          onClose={() => {
            setIsPrimaryCard(false);
            setToggleStates((prevState) => ({
              ...prevState,
              [clickedItemId]: false,
            }));
          }}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <CardPrimaryPopup
            setIsPrimaryCard={setIsPrimaryCard}
            setToggleStates={setToggleStates}
            clickedItemId={clickedItemId}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default UserInformation;
