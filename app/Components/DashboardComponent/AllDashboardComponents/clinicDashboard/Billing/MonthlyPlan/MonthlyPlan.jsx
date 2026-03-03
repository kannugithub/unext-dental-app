import React, { useEffect, useState } from "react";
import styles from "./monthlyplan.module.scss";
import { Link } from "react-scroll";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import ChangeNumberPopup from "../../OfficeSetting/OfficeDetails/ChangeNumberPopup";
import MonthlyPLanPopup from "./MonthlyPLanPopup";
import ExtensionPlanpopup from "./ExtensionPlanpopup";
import SubscriptionCancel from "./SubscriptionCancel";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdatedChangePlan from "./UpdatedChangePlan";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import moment from "moment";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";

const MonthlyPlan = ({
  getSingleOfficeDetailsData,
  setExtensionSelected,
  extensionSelected,
}) => {
  const [openCard, setOpenCard] = useState(false);
  const [openCard1, setOpenCard1] = useState(false);
  const [openCard2, setOpenCard2] = useState(false);
  const [clinicId, setClinicId] = useState();
  const [getConnectedClinicData, setGetConnectedClinicData] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState("");
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
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
    if (extensionSelected) {
      setOpenCard(true);
    }
  }, []);

  useEffect(() => {
    const data = userInfoData?.user?.clinics.find(
      (clinic) => clinic._id === clinicId
    );
    setGetConnectedClinicData(data);
  }, [userInfoData, clinicId]);

  useEffect(() => {
    try {
      const actionResult = dispatch(fetchSingleClinic(clinicId));
      actionResult.then((result) => {
        if (result?.payload?.success) {
          // setOpenDrop(false);
        }
      });
    } catch (error) {
      toast.error(error.message || "Error adding office");
    }
  }, [clinicId]);

  const openPopup = () => {
    setOpenCard(true);
  };
  const openPopupExtension = () => {
    setOpenCard1(true);
  };
  const openCancelSubscription = (type) => {
    setSubscriptionType(type);
    setOpenCard2(true);
  };
  const closeCancelSubscription = () => {
    setOpenCard2(false);
  };
  const closePopupExtension = () => {
    setOpenCard1(false);
  };

  const closePopup = () => {
    setOpenCard(false);
  };

  const expiryDate = getSingleOfficeDetailsData
    ? getSingleOfficeDetailsData?.data?.plan_expiration_date / 1000
    : singleClinicData?.data?.plan_expiration_date / 1000;

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={isDarkTheme === "dark" ? "card2 " : "card2  "}>
          <div className="card-body">
            <div className={styles.monthlyBox_container}>
              <div className={styles.monthly_plan_box}>
                <div className={styles.monthly_active_box}>
                  <button>Active</button>
                </div>
                <div className={styles.monthly_tag}>
                  {getSingleOfficeDetailsData
                    ? getSingleOfficeDetailsData?.data?.plan_duration
                    : singleClinicData?.data?.plan_duration}
                  &nbsp; Plan{" "}
                  {getSingleOfficeDetailsData ? (
                    ""
                  ) : (
                    <span onClick={openPopup}>Change plan </span>
                  )}
                </div>
              </div>
              <div className={styles.monthly_extension}>
                <p>
                  {getSingleOfficeDetailsData
                    ? getSingleOfficeDetailsData?.data?.physical_extension
                    : singleClinicData?.data?.physical_extension}
                  &nbsp; Physical Extensions
                </p>
                {getSingleOfficeDetailsData ? (
                  ""
                ) : (
                  <span onClick={openPopupExtension}>Add New Extensions</span>
                )}
              </div>
              <div className={styles.monthly_extension}>
                <p>
                  {getSingleOfficeDetailsData
                    ? getSingleOfficeDetailsData?.data?.remote_extension
                    : singleClinicData?.data?.remote_extension}
                  &nbsp; Remote Extension
                </p>
                {getSingleOfficeDetailsData ? (
                  ""
                ) : (
                  <span onClick={openPopupExtension}>Add New Extensions</span>
                )}
              </div>
              <div className={styles.expiry_box}>
                <div>Expiry Date</div>
                <div>
                  {moment(expiryDate * 1000).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
              </div>
              {getSingleOfficeDetailsData ? (
                ""
              ) : getConnectedClinicData?.subscription_status ? (
                <div className={styles.cancel_plan_btn}>
                  <button onClick={() => openCancelSubscription("cancel")}>
                    {" "}
                    Cancel Subscription{" "}
                  </button>
                </div>
              ) : (
                <div className={styles.active_plan_btn}>
                  <button onClick={() => openCancelSubscription("active")}>
                    {" "}
                    Active Subscription{" "}
                  </button>
                </div>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
      {openCard && (
        <RightCustomModal
          isOpen={openCard}
          onClose={closePopup}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          {/* <MonthlyPLanPopup
            // clinic_phone={values?.clinic_phone}
            closePopup={closePopup}
            // deleteType="staffDelete"
            getConnectedClinicData={getConnectedClinicData}
            clinicId={clinicId}
          /> */}
          <UpdatedChangePlan
            closePopup={closePopup}
            getConnectedClinicData={getConnectedClinicData}
            clinicId={clinicId}
          />
        </RightCustomModal>
      )}
      {openCard1 && (
        <RightCustomModal
          isOpen={openCard1}
          onClose={closePopupExtension}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          {/* <ExtensionPlanpopup
            // clinic_phone={values?.clinic_phone}
            closePopupExtension={closePopupExtension}
            getConnectedClinicData={getConnectedClinicData}
            clinicId={clinicId}
          // deleteType="staffDelete"
          /> */}
          <UpdatedChangePlan
            closePopup={closePopupExtension}
            getConnectedClinicData={getConnectedClinicData}
            clinicId={clinicId}
          />
        </RightCustomModal>
      )}
      {openCard2 && (
        <RightCustomModal
          isOpen={openCard2}
          onClose={closeCancelSubscription}
          width="60w"
          shouldCloseOnOutsideClick={true}
        >
          <SubscriptionCancel
            // clinic_phone={values?.clinic_phone}
            closeCancelSubscription={closeCancelSubscription}
            clinicId={clinicId}
            subscriptionType={subscriptionType}
            // deleteType="staffDelete"
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default MonthlyPlan;
