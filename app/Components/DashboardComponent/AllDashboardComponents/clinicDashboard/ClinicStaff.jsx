import React, { useEffect, useState } from "react";
import styles from "./clinicstaff.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { getClinicsStaffList } from "@/app/store/slices/clinicAdminSlices";
import moment from "moment/moment";
import Link from "next/link";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import InviteStaffMember from "./staffs/InviteStaffMember/InviteStaffMember";
import AssignStaff from "./staffs/AssignStaff/AssignStaff";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";

const ClinicStaff = ({ changeTab }) => {
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [staffAdminId, setStaffAdminId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openInviteMember, setOpenInviteMember] = useState(false);
  const [openAssignStaff, setOpenAssignStaff] = useState(false);
  const dispatch = useDispatch();
  const staffListData = useAppSelector((state) => state.clinic.staffListData);
  const deleteUserStaffData = useAppSelector(
    (state) => state.clinic.deleteUserStaffData
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const id = singleClinicData?.data?._id;

  useEffect(() => {
    if (singleClinicData?.data?._id !== undefined) {
      setLoading(true);
      dispatch(getClinicsStaffList(id)).then(() => {
        setLoading(false);
      });
    }
  }, [deleteUserStaffData, singleClinicData]);

  const handleOpen = (id) => {
    setStaffAdminId(id);
    setDeletePopup(true);
  };

  const handleClose = () => {
    setDeletePopup(false);
    setOpenInviteMember(false);
    setOpenAssignStaff(false);
  };

  const handleStaffEdit = (item) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("staff-id", item?._id);
    }
    changeTab("edit-staff", item?._id);
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
              <span> Staff List</span>
              <div className={styles.header_inp_box}>
                <Image src={Images.blue_search} alt="search icon" />
                <input
                  type="text"
                  placeholder="Type Staff Name, Phone Number, Email, ID"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>
            <div className={styles.subCompBtns}>
              <button onClick={() => setOpenInviteMember(true)}>
                <Image src={Images.plus_icon} alt="" />
                &nbsp; INVITE MEMBER
              </button>
              <button onClick={() => setOpenAssignStaff(true)}>
                <Image src={Images.userStaffIcon} alt="" />
                &nbsp; ASSIGN A STAFF
              </button>
              <Link href="/dashboard/add-staff">
                <button onClick={() => changeTab("add-staff")}>
                  <Image src={Images.plus_icon} alt="" />
                  &nbsp; ADD A STAFF
                </button>
              </Link>
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
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">Staff id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Email ID</th>
                          <th scope="col">Enroll date</th>
                          <th scope="col">Role</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className={styles.card_container_data}>
                        {staffListData?.data?.length > 0 ? (
                          staffListData?.data
                            ?.filter((item) => {
                              return (
                                (item &&
                                  item.name &&
                                  item.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())) ||
                                (item.p_number &&
                                  item.p_number.includes(searchTerm))
                              );
                            })
                            .map((item, index) => (
                              <tr key={item.id}>
                                <td scope="row">
                                  {(currentPage - 1) * 10 + index + 1}
                                </td>
                                <td>{item?.name}</td>
                                <td>
                                  {formatPhoneNumber(item?.p_number || "--")}
                                </td>
                                <td>{item?.email}</td>
                                <td>
                                  {new Date(item?.createdAt || "--")
                                    .toLocaleDateString("en-US", {
                                      month: "2-digit",
                                      day: "2-digit",
                                      year: "numeric",
                                    })
                                    .replace(/\//g, "/")}
                                </td>
                                <td>{item?.role}</td>
                                <td>
                                  <span className={styles.action_icons}>
                                    <Image
                                      src={Images.editIcon}
                                      alt=""
                                      onClick={() => handleStaffEdit(item)}
                                    />

                                    <Image
                                      className={styles.action_icons3}
                                      src={Images.deleteIcon}
                                      alt=""
                                      onClick={() => handleOpen(item?._id)}
                                    />
                                  </span>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {deletePopup && (
        <ConfirmationPopup
          staffAdminId={staffAdminId}
          setDeletePopup={setDeletePopup}
          deleteType="staffDelete"
        />
      )}
      {openInviteMember && (
        <RightCustomModal
          isOpen={openInviteMember}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <InviteStaffMember setOpenInviteMember={setOpenInviteMember} />
        </RightCustomModal>
      )}
      {openAssignStaff && (
        <RightCustomModal
          isOpen={openAssignStaff}
          onClose={handleClose}
          width="40w"
          shouldCloseOnOutsideClick={true}
        >
          <AssignStaff setOpenAssignStaff={setOpenAssignStaff} />
        </RightCustomModal>
      )}
    </>
  );
};

export default ClinicStaff;
