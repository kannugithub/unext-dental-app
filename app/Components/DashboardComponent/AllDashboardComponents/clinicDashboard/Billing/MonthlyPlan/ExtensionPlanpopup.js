import React, { useEffect, useState } from "react";
import styles from "./extensionplanpopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  sendUpgradeExtesnion,
  upgradeExtension,
} from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";

const ExtensionPlanpopup = ({
  closePopupExtension,
  getConnectedClinicData,
  clinicId,
}) => {
  const [count, setCount] = useState(
    Number(getConnectedClinicData?.physical_extension) || 0
  );
  const [count1, setCount1] = useState(
    Number(getConnectedClinicData?.remote_extension) || 0
  );
  const upgradeExtensionData = useSelector(
    (state) => state.clinic.upgradeExtensionData
  );
  const dispatch = useDispatch();
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
    };
    dispatch(upgradeExtension(data));
  }, [count, count1]);

  const handleUpgradeExtension = async () => {
    const data = {
      clinicId: clinicId,
      physical_extension: count,
      remote_extension: count1,
    };
    try {
      const actionResult = await dispatch(sendUpgradeExtesnion(data));
      const { status, message } = actionResult.payload;
      if (status) {
        toast.success(message);
        closePopupExtension();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className={styles.ChangeNumberPopup_wrapper}>
      <div className={styles.main_wrapper}>
        <div className={styles.signup_extension}>
          <div className={styles.phy_extension}>
            <p> Number of Physical Extensions</p>
            <span>
              Connected Extensions {getConnectedClinicData?.physical_extension}
            </span>
          </div>
          <div className={styles.extension_inc_dec}>
            <div className={styles.minus} onClick={decreasePhysicalExtension}>
              -
            </div>
            <div className={styles.extension_count}>{count}</div>
            <div className={styles.plus} onClick={increasePhysicalExtension}>
              +
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.main_wrapper}>
        <div className={styles.signup_extension}>
          <div className={styles.phy_extension}>
            <p>Number of Remote Extension</p>
            <span>Connected Extensions {count1}</span>
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

      <hr></hr>

      <div className={styles.phy_extension_amount}>
        <p>Charged Amount:</p>
        <span>${upgradeExtensionData?.charged_amount}</span>
      </div>
      <div className={styles.phy_extension_amount}>
        <p>next billing cycle:</p>
        <span>${upgradeExtensionData?.New_billing_amount}</span>
      </div>
      <div className={styles.Button_wrappr}>
        <div className={styles.cn_btn}>
          <button onClick={closePopupExtension}>Cancel</button>
        </div>
        <div className={styles.sv_btn}>
          <button onClick={handleUpgradeExtension}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPlanpopup;
