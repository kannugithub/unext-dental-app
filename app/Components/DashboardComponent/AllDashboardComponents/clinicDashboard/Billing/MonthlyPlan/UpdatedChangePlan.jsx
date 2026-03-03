import React, { useEffect, useState } from "react";
import styles from "./updatedChangePlan.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { extensionPricing } from "@/app/store/slices/authSlices";
import { useDispatch } from "react-redux";
import {
  changeSubscriptionPlanType,
  updateSubscription,
  upgradeExtension,
} from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const UpdatedChangePlan = ({
  closePopup,
  getConnectedClinicData,
  clinicId,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState(
    getConnectedClinicData?.plan_duration
  );
  const [activePlanType, setActivePlanType] = useState("");
  const [count, setCount] = useState(
    Number(getConnectedClinicData?.physical_extension) || 0
  );
  const [count1, setCount1] = useState(
    Number(getConnectedClinicData?.remote_extension) || 0
  );
  const [isDataPersent, setIsDataIsPersent] = useState(false);
  const extensionPriceAmount = useAppSelector(
    (state) => state.authWeb.extensionPrice
  );
  const upgradeExtensionData = useAppSelector(
    (state) => state.clinic.upgradeExtensionData
  );
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  const increasePhysicalExtension = () => {
    setCount(count + 1);
  };

  const decreasePhysicalExtension = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increaseRemoteExtension = () => {
    setCount1(count1 + 1);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const decreaseRemoteExtension = () => {
    if (count1 > 0) {
      setCount1(count1 - 1);
    }
  };

  useEffect(() => {
    const data = {
      clinicId: clinicId,
      physical_extension: count,
      remote_extension: count1,
      plan: activePlanType,
      type: getConnectedClinicData?.physical_extension_type,
      subscription: selectedPlanDuration,
    };
    setIsDataIsPersent(true);
    try {
      if (activePlanType) {
        const actionResult = dispatch(upgradeExtension(data));
        const { success } = actionResult.payload;
        if (success) {
          setIsDataIsPersent(false);
        }
      }
    } catch (error) {
      setIsDataIsPersent(false);
    }
  }, [count, count1, activePlanType, selectedPlanDuration]);

  useEffect(() => {
    setSelectedPlanDuration(getConnectedClinicData?.plan_duration);
    if (getConnectedClinicData?.plan_duration === "monthly") {
      setSelectedPlanId(1);
    } else {
      setSelectedPlanId(2);
    }
    setActivePlanType(getConnectedClinicData?.plan);
  }, [getConnectedClinicData]);

  const handlePlanSelection = (id, type) => {
    setSelectedPlanId(id);
    setSelectedPlanDuration(type);
  };

  const handleUpdatePlan = async () => {
    const data = {
      clinicId: clinicId,
      amount: upgradeExtensionData?.New_billing_amount,
      physical_extension: count,
      remote_extension: count1,
      physical_extension_type: getConnectedClinicData?.physical_extension_type,
      subscription: selectedPlanDuration,
      plan: activePlanType,
    };
    if (isDataPersent) {
      return;
    }
    setIsDataIsPersent(true);
    try {
      const actionResult = await dispatch(updateSubscription(data));
      const { status, message } = actionResult.payload;
      if (status) {
        toast.success(message);
        setIsDataIsPersent(false);
      }
      closePopup();
    } catch (error) {
      setIsDataIsPersent(false);
      toast.error(error?.response?.data?.message);
    }
  };

  console.log("-=-=-=-=-", getConnectedClinicData?.physical_extension_type);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.ChangeNumberPopup_wrapper}>
          {isDarkTheme === "dark" ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => closePopup(false)}
            >
              <path
                d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              onClick={() => closePopup(false)}
            >
              <path
                d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                fill="black"
              />
            </svg>
          )}

          <div className={styles.main_wrapper}>
            <div className={styles.change_plan_heading}>
              <p>Choose your desired plan</p>
            </div>
            <div
              className={styles.plan_boxes}
              onClick={() => setActivePlanType("started")}
            >
              <div className={styles.plan_select_box}>
                <input
                  type="radio"
                  name=""
                  checked={activePlanType === "started"}
                />
                <label htmlFor="">uNext Started</label>
              </div>
              <div className={styles.plan_amount}>$35.00</div>
            </div>
            <div
              className={styles.plan_boxes}
              onClick={() => setActivePlanType("pro")}
            >
              <div className={styles.plan_select_box}>
                <input
                  type="radio"
                  name=""
                  checked={activePlanType === "pro"}
                />
                <label htmlFor="">uNext Pro</label>
              </div>
              <div className={styles.plan_amount}>$45.00</div>
            </div>

            <div className={styles.signup_extension}>
              <div className={styles.phy_extension}>
                <div className={styles.extension_with_type}>
                  <div>
                    <p> Physical Extensions</p>
                    <span>
                      Connected Extensions (
                      {getConnectedClinicData?.physical_extension})
                    </span>
                  </div>
                  {/* <div>
                    &nbsp; &nbsp;&nbsp;&nbsp;
                    <Image src={Images.ChnageplanMobile} />
                  </div> */}
                  &nbsp; &nbsp;&nbsp;&nbsp;
                  <div>
                    {getConnectedClinicData?.physical_extension_type ===
                      "type1" && (
                      <div className={styles.typeImge}>
                        <Image src={Images.type1} alt="type 1" />
                      </div>
                    )}
                    {getConnectedClinicData?.physical_extension_type ===
                      "type2" && (
                      <div className={styles.typeImge}>
                        <Image src={Images.type2} alt="type 2" />
                      </div>
                    )}
                    {getConnectedClinicData?.physical_extension_type ===
                      "type3" && (
                      <div className={styles.typeImge}>
                        <Image src={Images.type3} alt="type 3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.extension_inc_dec}>
                <div
                  className={styles.minus}
                  onClick={decreasePhysicalExtension}
                >
                  -
                </div>
                <div className={styles.extension_count}>{count}</div>
                <div
                  className={styles.plus}
                  onClick={increasePhysicalExtension}
                >
                  +
                </div>
              </div>
            </div>
          </div>

          <div className={styles.main_wrapper}>
            <div className={styles.signup_extension}>
              <div className={styles.phy_extension}>
                <p> Remote Extensions</p>
                <span>
                  Connected Extensions (
                  {getConnectedClinicData?.remote_extension})
                </span>
              </div>
              <div className={styles.extension_inc_dec}>
                <div className={styles.minus} onClick={decreaseRemoteExtension}>
                  -
                </div>
                <div className={styles.extension_count}>{count1}</div>
                <div className={styles.plus} onClick={increaseRemoteExtension}>
                  +
                </div>
              </div>
            </div>
          </div>

          <div className={styles.main_wrapper}>
            <div className={styles.card_wrapper}>
              <div className={styles.select_newNumber}>
                <div className={styles.select_plan}>
                  <div
                    className={` ${
                      selectedPlanId === 1
                        ? styles.selected_plan_1
                        : styles.select_plan_btn
                    }`}
                    onClick={() => handlePlanSelection(1, "monthly")}
                  >
                    Monthly Only ${upgradeExtensionData?.monthlyprice}/Month
                  </div>
                  <div
                    className={` ${
                      selectedPlanId === 2
                        ? styles.selected_plan_1
                        : styles.select_plan_btn
                    }`}
                    onClick={() => handlePlanSelection(2, "yearly")}
                  >
                    Yearly ${upgradeExtensionData?.yearlyprice}/Year
                  </div>
                </div>
                <div className={styles.charged_amount}>
                  <div>Charged Amount:</div>
                  <div>${upgradeExtensionData?.charged_amount}</div>
                </div>
                <div className={styles.charged_amount}>
                  <div>Next Billing Cycle:</div>
                  <div>${upgradeExtensionData?.New_billing_amount}</div>
                </div>
                <div className={styles.first_next_btn}>
                  <button className={styles.cancel_btn} onClick={closePopup}>
                    Cancel
                  </button>
                  <button
                    className={styles.next_btn}
                    onClick={handleUpdatePlan}
                    disabled={isDataPersent}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatedChangePlan;
