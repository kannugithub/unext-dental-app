import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { fetchGetCllfarward } from "@/app/store/slices/clinicAdminSlices";
import { fetchUserInfo } from "@/app/store/slices/authSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";

const CallForward = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const getCallfarwardList = useAppSelector(
    (state) => state.clinic.getCallfarwardList
  );

  useEffect(() => {
    setLoading(true);
    if (singleClinicData) {
      dispatch(fetchGetCllfarward(singleClinicData?.data?._id)).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, singleClinicData]);

  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  // }, []);

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
              <span>Call Forward</span>
            </div>
            <div className={styles.subCompBtns}>
              <button>
                <Image src={Images.export_icon} alt="" />
                &nbsp; EXPORT
              </button>
            </div>
          </div>
          {loading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : (
            <div className={styles.card_container}>
              <div
                className={
                  isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">From</th>
                          <th scope="col">Forward To</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {getCallfarwardList?.data?.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <p className={styles.callForward_name}>
                                {item?.userId?.name || "--"}
                              </p>
                              <p className={styles.callForward_number}>
                                {formatPhoneNumber(item?.from || "--")}
                              </p>
                            </td>
                            <td>
                              <p className={styles.reviver_number}>
                                {formatPhoneNumber(item?.to || "--")}
                              </p>
                            </td>

                            <td className={styles.reviver_number}>
                              {new Date(item?.createdAt || "--")
                                .toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "/")}
                              &nbsp;
                              {new Date(item?.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </td>
                          </tr>
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
    </>
  );
};

export default CallForward;
