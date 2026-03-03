import React, { useEffect, useState } from "react";
import styles from "../../../../DashboardHeader/subContainer.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import Link from "next/link";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch } from "react-redux";
import { fetchCouponList } from "@/app/store/slices/superAdminSlices";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import PoupAlert from "../../../SuperAdminDashboard/AlertPopup/PoupAlert";
import CouponToggle from "../../../SuperAdminDashboard/AlertPopup/CouponToggle";

const CouponList = ({ changeTab }) => {
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [couponAlert, setCouponAlert] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const fetchCouponListData = useAppSelector(
    (state) => state.admin.fetchCouponListData
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const addCouponsData = useAppSelector((state) => state.admin.addCouponsData);
  const deleteCouponFromWebData = useAppSelector(
    (state) => state.admin.deleteCouponFromWebData
  );
  const getDataforCoupon = useAppSelector(
    (state) => state.admin.getDataforCoupon
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const data = await dispatch(fetchCouponList());
        const { response } = unwrapResult(data);
        if (response) {
          setDataLoading(false);
        }
      } catch (error) {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [addCouponsData, deleteCouponFromWebData, getDataforCoupon]);

  const handlePopUpOpen = (item) => {
    setCouponAlert(true);
    setSelectedCouponId(item?._id);
    setSelectedData(item);
  };
  const toggleCheckbox = (e, id) => {
    const data = {
      value: e.target.checked,
      id: id,
    };
    setIsChecked(data);
    setSelectedCouponId(id);
  };
  const handleCouponTab = (item) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("item-id", item?._id);
    }
    changeTab("edit-coupon", item);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div
          style={
            isDarkTheme
              ? {}
              : userInfoData?.user?.role === "Clinic Admin"
              ? { background: "#0a22a8" }
              : { background: "#409eee" }
          }
          className={styles.dashboard_sub_conatiner}
        >
          <div className={styles.dashSub_blue}>
            <div className={styles.compo_name}>
              <span>Coupon List</span>
            </div>
            <div className={styles.subCompBtns}>
              {/* <Link href="/dashboard/add-coupon"> */}

              <button onClick={() => changeTab("add-coupon")}>
                {" "}
                <Image src={Images.plus_icon} alt="" />
                &nbsp; ADD A COUPON
              </button>
              {/* </Link> */}
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
                  isDarkTheme === "dark card1  mx-4"
                    ? styles.card2
                    : "card1  mx-4"
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Coupon</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Expiration</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {fetchCouponListData?.data?.map((item, index) => (
                          <>
                            <tr key={index}>
                              <td scope="row">{index + 1}</td>
                              <td>{item?.couponText}</td>
                              <td>${item?.discount}</td>
                              <td>
                                {moment(item?.expirationDate).format(
                                  "DD MMMM YY, h:mm:ss A"
                                )}
                              </td>
                              <td>
                                <span className={styles.action_icons}>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id={`flexSwitchCheckChecked${item._id}`}
                                      checked={!item?.disable}
                                      onChange={(e) =>
                                        toggleCheckbox(e, item._id)
                                      }
                                    />
                                    {isChecked && (
                                      <CouponToggle
                                        type="toggleOpen"
                                        setIsChecked={setIsChecked}
                                        isChecked={isChecked}
                                        selectedCouponId={selectedCouponId}
                                        setSelectedCouponId={
                                          setSelectedCouponId
                                        }
                                      />
                                    )}

                                    <label
                                      className="form-check-label"
                                      htmlFor={`flexSwitchCheckChecked${item.id}`}
                                    ></label>
                                  </div>

                                  <Image
                                    src={Images.editIcon}
                                    alt=""
                                    onClick={() => handleCouponTab(item)}
                                  />
                                  <Image
                                    className={styles.action_icons3}
                                    src={Images.deleteIcon}
                                    alt=""
                                    onClick={() => handlePopUpOpen(item)}
                                  />
                                </span>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {couponAlert && (
        <PoupAlert
          setCouponAlert={setCouponAlert}
          couponAlert={couponAlert}
          deleteType="cancelCouponDelete"
          selectedCouponId={selectedCouponId}
          selectedData={selectedData}
          type="Coupon"
          couponIds={couponIds}
        />
      )}
    </>
  );
};

export default CouponList;
