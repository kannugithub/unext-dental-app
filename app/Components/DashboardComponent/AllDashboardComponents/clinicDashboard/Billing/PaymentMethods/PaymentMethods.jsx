import React, { useEffect, useState } from "react";
import SwitchToggle from "@/app/Components/common/SwitchToggle/SwitchToggle";
import Image from "next/image";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import styles from "../TransactionHistory/transaction.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import CardDetailsPopup from "@/app/Components/common/cardDetailsPopup/CardDetailsPopup";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetSavedPayments } from "@/app/store/slices/clinicAdminSlices";
import Images from "@/app/Components/Images/Images";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import CardPrimaryPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/CardPrimaryPopup";
import PoupAlert from "../../../SuperAdminDashboard/AlertPopup/PoupAlert";

const PaymentMethods = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [openCard, setOpenCard] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [isPrimaryCard, setIsPrimaryCard] = useState(false);
  const [toggleStates, setToggleStates] = useState({});
  const [clickedItemId, setClickedItemId] = useState(null);
  const [clinicId, setClinicId] = useState();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const [clickedItemToggleState, setClickedItemToggleState] = useState(false);
  const getPrimaryCardData = useAppSelector(
    (state) => state.clinic.getPrimaryCardData
  );
  const fetcgDeleteCardDetails = useAppSelector(
    (state) => state.clinic.fetcgDeleteCardDetails
  );
  const fetchAddCardDetails = useAppSelector(
    (state) => state.clinic.fetchAddCardDetails
  );
  const savedPaymentList = useAppSelector(
    (state) => state.clinic.savedPaymentList
  );
  const dispatch = useDispatch();

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
    setUserId(userInfoData?.user?._id);
    if (clinicId) {
      dispatch(fetchgetSavedPayments(clinicId));
    }
  }, [clinicId, dispatch]);

  const handleOpen = (id) => {
    setCardId(id);
    setDeletePopup(true);
  };

  const handleClose = () => setDeletePopup(false);

  // const handleToggle = (id, isChecked) => {
  //   setToggleStates((prevState) => ({ ...prevState, [id]: isChecked }));
  //   setClickedItemId(id);
  //   if (isChecked) {
  //     setIsPrimaryCard(true);
  //   }
  // };

  const handleToggle = (id, isChecked) => {
    setToggleStates((prevState) => ({ ...prevState, [id]: isChecked }));
    setClickedItemId(id);
    setClickedItemToggleState(isChecked);
    setIsPrimaryCard(true);
  };
  const closePopUp = () => {
    setOpenCard(false);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashSub_blue}>
          <div className={styles.compo_name}>
            <span>Payment Methods</span>
          </div>
          <div className={styles.subCompBtns}>
            <button onClick={() => setOpenCard(true)}>
              <Image src={Images.plus_icon} alt="" />
              &nbsp; ADD A PAYMENT METHOD
            </button>
          </div>
        </div>
        <div className={styles.dashSub_blue1}>
          <div>
            <span>
              These payment methods pay for subscriptions or are associated with
              billing profiles.
            </span>
          </div>
        </div>
        <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2 mx-4"}>
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
                              <td>{item?.billing_address?.country || "--"} </td>
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
                                      toggleStates={toggleStates}
                                    />
                                  )}

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
            ) : (
              <div className="d-flex justify-content-center">
                <SpinnerLoader />
              </div>
            )}
          </div>
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
            userId={userId}
            setOpenCard={setOpenCard}
            // deleteType="staffDelete"
          />
        </RightCustomModal>
      )}
      {deletePopup && (
        <PoupAlert
          setCouponAlert={setDeletePopup}
          couponAlert={deletePopup}
          deleteType="cardDeleteType"
          selectedCouponId={cardId}
          type="cardDeleteType"
          clinicId={clinicId}
        />
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
            clickedItemToggleState={clickedItemToggleState}
            setClickedItemToggleState={setClickedItemToggleState}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default PaymentMethods;
