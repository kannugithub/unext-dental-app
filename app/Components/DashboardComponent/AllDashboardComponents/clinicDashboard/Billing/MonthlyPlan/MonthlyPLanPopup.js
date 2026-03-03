import React, { useEffect, useState } from "react";
import styles from "./monthlyplanpopup.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { extensionPricing } from "@/app/store/slices/authSlices";
import { useDispatch } from "react-redux";
import { changeSubscriptionPlanType } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";

const MonthlyPLanPopup = ({ closePopup, getConnectedClinicData, clinicId }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState('monthly')
  const extensionPriceAmount = useAppSelector(
    (state) => state.authWeb.extensionPrice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const pricedata = {
      plan: getConnectedClinicData?.plan,
      physical_extension: getConnectedClinicData?.physical_extension,
      remote_extension: getConnectedClinicData?.remote_extension,
      type: getConnectedClinicData?.physical_extension_type,
    };
    dispatch(extensionPricing(pricedata));
  }, []);

  useEffect(() => {
    setSelectedPlanDuration(getConnectedClinicData?.plan_duration)
    if (getConnectedClinicData?.plan_duration === 'monthly') {
      setSelectedPlanId(1)
    } else {
      setSelectedPlanId(2)
    }
  }, [getConnectedClinicData])

  const handlePlanSelection = (id, type) => {
    setSelectedPlanId(id);
    setSelectedPlanDuration(type)
  };

  const handleChangePlanType = async () => {
    const data = {
      clinicId: clinicId,
      amount: selectedPlanDuration === 'monthly' ? extensionPriceAmount?.data?.totalMontlyPrice : extensionPriceAmount?.data?.totalYearlyPrice,
      physical_extension: getConnectedClinicData?.physical_extension,
      physical_extension_type: getConnectedClinicData?.physical_extension_type,
      subscription: selectedPlanDuration
    }
    try {
      const actionResult = await dispatch(changeSubscriptionPlanType(data));
      const { status, message } = actionResult.payload;
      if (status) {
        toast.success(message)
      }
      closePopup()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className={styles.ChangeNumberPopup_wrapper}>
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
      <div className={styles.main_wrapper}>
        <div className={styles.card_wrapper}>
          <div className={styles.select_newNumber}>
            <div className={styles.select_state}>
              <p>Choose your desired plan</p>
              {/* <span>We have 5 Extensions</span> */}
            </div>
            <div className={styles.extension_types}>We have {getConnectedClinicData?.physical_extension} physical extensions</div>
            <div className={styles.extension_types}>We have {getConnectedClinicData?.physical_extension_type} physical extension type</div>
            <div className={styles.extension_types}>We have {getConnectedClinicData?.remote_extension} remote extensions</div>
            <div className={styles.select_plan}>
              <div
                className={` ${selectedPlanId === 1
                  ? styles.selected_plan_1
                  : styles.select_plan_btn
                  }`}
                onClick={() => handlePlanSelection(1, 'monthly')}
              >
                Monthly Only ${extensionPriceAmount?.data?.totalMontlyPrice}/Month
              </div>
              <div
                className={` ${selectedPlanId === 2
                  ? styles.selected_plan_1
                  : styles.select_plan_btn
                  }`}
                onClick={() => handlePlanSelection(2, 'yearly')}
              >
                Yearly ${extensionPriceAmount?.data?.totalYearlyPrice}/Year
              </div>
            </div>

            <div className={styles.first_next_btn}>
              <button className={styles.next_btn} onClick={handleChangePlanType}>
                <span>Change Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPLanPopup;
