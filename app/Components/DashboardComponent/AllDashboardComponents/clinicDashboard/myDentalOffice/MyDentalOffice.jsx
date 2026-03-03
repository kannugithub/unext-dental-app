import CustomModal from "@/app/Components/PopupsComponents/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./mydentaloffice.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import clinicImg from "../../../../../assets/images/Rectangle39814.png";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import UpdateDentalOfficePopup from "./UpdateDentalOfficePopup";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import {
  fetchGetClinicListByUser,
  setConnectedClinicId,
} from "@/app/store/slices/clinicAdminSlices";
import SubscriptionPopup from "./SubsriptonOfficePopup/SubscriptionPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";
import PoupAlert from "../../SuperAdminDashboard/AlertPopup/PoupAlert";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";

const MyDentalOffice = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [clinicId, setClinicId] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clinic, setClinic] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const clinicList = useAppSelector(
    (state) => state.clinic.getClinicListData.clinic_data
  );
  const [filteredClinicList, setFilteredClinicList] = useState(
    clinicList ? clinicList : []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (clinicList) {
      setFilteredClinicList(clinicList);
    }
  }, [clinicList]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setFilteredClinicList(clinicList ? clinicList : []);
      return;
    }

    if (!clinicList) return;

    const filteredData = clinicList.filter((clinic) => {
      return clinic.clinic_name
        ?.toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setFilteredClinicList(filteredData);
  };

  const handleDeletePop = (id) => {
    setClinicId(id);
    setDeletePopup(true);
  };
  const handleUpdatePop = () => {
    setUpdatePopup(true);
  };
  const handleClose = () => setDeletePopup(false);
  const handleUpdateClose = () => setUpdatePopup(false);

  useEffect(() => {
    if (userInfoData?.user?._id !== undefined) {
      dispatch(fetchGetClinicListByUser(userInfoData?.user?._id));
    }
  }, [userInfoData, dispatch]);

  let clinicid;
  try {
    clinicid = localStorage?.getItem("clinicId");
  } catch (err) {
    clinicid = "default value";
  }

  const onClinicChange = (id) => {
    setClinic(id);
    dispatch(setConnectedClinicId(id));
    localStorage.setItem("previousClinicId", clinicid);
    localStorage.setItem("clinicId", id);
    toast.success("office Switch Successfully");
    // window.location.reload();
  };

  useEffect(() => {
    if (clinicid) {
      setClinic(clinicid);
    }
  }, [clinicid]);

  useEffect(() => {
    if (clinic !== null) {
      try {
        const actionResult = dispatch(fetchSingleClinic(clinic));
        actionResult.then((result) => {
          if (result?.payload?.success) {
            // setOpenDrop(false);
          }
        });
      } catch (error) {
        toast.error(error.message || "Error adding office");
      }
    }
  }, [clinic]);

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
              <span> Office List</span>
              <div className={styles.header_inp_box}>
                <Image src={Images.blue_search} alt="search icon" />

                <input
                  type="text"
                  placeholder="Type office name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className={styles.subCompBtns}>
              <button onClick={handleUpdatePop}>
                <Image src={Images.plus_icon} alt="" /> ADD OFFICE
              </button>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"}
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className={styles.table_heading}>
                      <tr className={styles.table_heading}>
                        <th scope="col">S.No</th>
                        <th scope="col">OFFICE NAME</th>
                        <th scope="col">Physical Extensions</th>
                        <th scope="col">Remote Extensions</th>
                        <th scope="col">Current type of plan </th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody
                      id="clinicListTable"
                      className={styles.card_container_data}
                    >
                      {filteredClinicList &&
                        filteredClinicList?.map((item, key) => (
                          <tr key={key}>
                            <td scope="row">{key + 1}</td>
                            <td>
                              <div className={styles.clinics_box} key={key}>
                                {item?.clinic_name && (
                                  <span className={styles.clinics_box_image}>
                                    {item?.image && item.image.length > 0 ? (
                                      <div>
                                        <Image
                                          src={item.image[0]}
                                          width={33}
                                          height={33}
                                          alt="Clinic Image"
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        {item?.clinic_name
                                          ?.split(" ")
                                          .slice(0, 2)
                                          .map((word) => word[0].toUpperCase())
                                          .join("")}
                                      </>
                                    )}
                                  </span>
                                )}

                                <div>
                                  <div
                                    className={styles.clinic_details}
                                    onClick={() => onClinicChange(item._id)}
                                  >
                                    <span className={styles.clinic_naming}>
                                      {item?.clinic_name ? (
                                        <span>{item?.clinic_name}</span>
                                      ) : (
                                        <span
                                          className={styles.not_clinic_name}
                                        >
                                          Please complete office setup
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  {item?.clinic_address ? (
                                    <div className={styles.clinic_location}>
                                      <Image src={Images.locationIcon2}></Image>
                                      <span>{item?.clinic_address}</span>
                                    </div>
                                  ) : (
                                    <> </>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{item?.physical_extension}</td>
                            <td>{item?.remote_extension}</td>
                            <td>{item?.plan_duration}</td>
                            <td>
                              <span className={styles.action_icons}>
                                <Image
                                  src={Images.switchIconTwo}
                                  alt=""
                                  onClick={() => onClinicChange(item._id)}
                                />
                                <Link
                                  href="/dashboard/office-setting/"
                                  className={styles.action_icons2}
                                >
                                  <Image src={Images.editIcon} alt="" />
                                </Link>

                                <Image
                                  className={styles.action_icons3}
                                  src={Images.deleteIcon}
                                  alt="delete icon"
                                  onClick={() => handleDeletePop(item?._id)}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {deletePopup && (
        <CustomModal
          isOpen={deletePopup}
          onClose={handleClose}
          shouldCloseOnOutsideClick={true}
        >
          <ConfirmationPopup
            clinicId={clinicId}
            setDeletePopup={setDeletePopup}
            deleteType="staffDelete"
          />
        </CustomModal>
      )} */}
      {deletePopup && (
        <PoupAlert
          setCouponAlert={setDeletePopup}
          couponAlert={deletePopup}
          deleteType="officeDeActivate"
          selectedCouponId={clinicId}
          type="officeDeActivate"
          clinicId={clinicId}
        />
      )}
      {updatePopup && (
        <CustomModal
          isOpen={updatePopup}
          onClose={handleUpdateClose}
          width="50w"
          shouldCloseOnOutsideClick={true}
        >
          <SubscriptionPopup
            clinicId={clinicId}
            setUpdatePopup={setUpdatePopup}
            // deleteType="staffDelete"
          />
        </CustomModal>
      )}
    </>
  );
};

export default MyDentalOffice;
