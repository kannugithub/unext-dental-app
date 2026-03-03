import React, { useEffect, useState } from "react";
import styles from "../OfficeStaff/OfficeStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getAllUserList } from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import UserInfoOfficeList from "@/app/Components/DashboardComponent/AllDashboardComponents/SuperAdminDashboard/Users/UserInfoOfficeList/UserInfoOfficeList";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import PoupAlert from "../AlertPopup/PoupAlert";

const UsersList = ({
  currentTab,
  params,
  changeTab,
  openOffiecList,
  setOpenOfficeList,
}) => {
  const [couponAlert, setCouponAlert] = useState(false);

  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openweek, setOpenweek] = useState(false);
  const [selectedRole, setSelectedRole] = useState(false);
  const [openfilterpopup, setOpenfilterpopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const dispatch = useDispatch();
  const allUserList = useAppSelector((state) => state.admin.getAllUserListData);
  const deleteUserList = useAppSelector((state) => state.admin.deleteUserData);
  const totalPages = allUserList?.totalPages;
  const users = allUserList?.userdata;
  const deleteUserData = useAppSelector((state) => state.admin.deleteUserData);

  const spitstring = () => {
    const value = currentTab.split("/");
    switch (value[1]) {
      case "all-users":
        return "all-users";
      case "office-admins":
        return "officeAdmin";
      case "super-admin":
        return "admin";
      case "support":
        return "supports";
      case "staff":
        return "staff";
      default:
        return "";
    }
  };

  // console.log("roles", roles?.support);
  console.log({ openOffiecList });

  useEffect(() => {
    let roles = spitstring();
    const value = currentTab.split("/");
    const data = {
      currentPage: currentPage,
      limit: limit,
      role: roles === "all-users" ? false : roles,
    };

    if (value[1] === "all-users") {
      dispatch(getAllUserList(data));
    } else if (value[1] === "office-admins") {
      dispatch(getAllUserList(data));
    } else if (value[1] === "super-admin") {
      dispatch(getAllUserList(data));
    } else if (value[1] === "supports") {
      dispatch(getAllUserList(data));
    } else if (value[1] === "staff") {
      dispatch(getAllUserList(data));
    }
  }, [currentTab, params, deleteUserList, currentPage, limit, deleteUserData]);

  const handleOpen = (id) => {
    setUserId(id);
    setCouponAlert(true);
  };

  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // user Search

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  useEffect(() => {
    const fetchAllUserSearch = async () => {
      setDataLoading(true);
      try {
        const data = {
          role: spitstring(),
          search: debouncedSearchInput,
        };
        const actionResult = await dispatch(getAllUserList(data));
        const { success } = unwrapResult(actionResult);
        if (success) {
          setDataLoading(false);
        }
      } catch (error) {
        setDataLoading(false);
      }
    };

    fetchAllUserSearch();
  }, [dispatch, debouncedSearchInput]);

  // Component render logic here...

  const userOfficelist = (item) => {
    console.log(item);
    setOpenOfficeList(item);

    changeTab("user-officeinfo_list");
  };

  const handleUserTab = (item) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user-id", item?._id);
    }
    changeTab("edit-user", item?._id);
  };

  const handleClick = () => {
    changeTab("add-user");
  };
  let roles = spitstring();

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        {/* {openOffiecList?.val === false ? ( */}
        <>
          <div
            className={
              isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
            }
          >
            {/* {!openOffiecList ? ( */}
            <>
              <div className={styles.dashboard_sub_conatiner}>
                <div className={styles.dashSub_blue}>
                  <div className={styles.compo_name}>
                    <div className={styles.office_list_tag}>
                      {" "}
                      <div className={styles.office_list_tag}>
                        {roles === "all-users"
                          ? "All Users"
                          : roles === "officeAdmin"
                          ? "Office Admin"
                          : roles === "admin"
                          ? "Super Admin"
                          : roles === "Support"
                          ? "Support"
                          : roles === "staff"
                          ? "Staff"
                          : "User List"}
                      </div>
                    </div>
                    <div className={styles.header_inp_box}>
                      {isDarkTheme === "dark" ? (
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.457 10.4288C14.043 9.62721 14.3867 8.67612 14.3867 7.6537C14.3867 4.79705 11.7266 2.48047 8.44531 2.48047C5.16016 2.48047 2.5 4.79705 2.5 7.6537C2.5 10.5104 5.16016 12.8269 8.44141 12.8269C9.63281 12.8269 10.7422 12.5212 11.6719 11.9981L11.9414 11.8351L16.1836 15.524L17.5 14.3589L13.2617 10.67L13.457 10.4288ZM11.7734 4.76308C12.6602 5.53414 13.1484 6.55995 13.1484 7.65031C13.1484 8.74066 12.6602 9.76648 11.7734 10.5375C10.8867 11.3086 9.70703 11.7332 8.45312 11.7332C7.19922 11.7332 6.01953 11.3086 5.13281 10.5375C4.24609 9.76648 3.75781 8.74066 3.75781 7.65031C3.75781 6.55995 4.24609 5.53414 5.13281 4.76308C6.01953 3.99202 7.19922 3.56743 8.45312 3.56743C9.70703 3.56743 10.8867 3.99202 11.7734 4.76308Z"
                            fill="#409EEE"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.searchIcon} alt="search icon" />
                      )}
                      <input
                        type="text"
                        name=""
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  <div className={styles.subCompBtns}>
                    {/* <Link href="/dashboard/add-user"> */}
                    <button onClick={handleClick}>
                      <Image src={Images.plus_icon} alt="" />
                      &nbsp; ADD A USER
                    </button>
                    {/* </Link> */}

                    {/* <button className={styles.dash_btn_new}>
                    <Image src={Images.filter_icon} alt="" /> &nbsp;USER ROLL
                  </button> */}

                    {/* {isDarkTheme == "dark" ? (
                    <Image
                      src={Images.dropdownWhite}
                      onClick={() => setOpenweek(!openweek)}
                    ></Image>
                  ) : (
                    <Image
                      src={Images.dropdown_black}
                      onClick={() => setOpenweek(!openweek)}
                    ></Image>
                  )} */}
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
                        isDarkTheme === "dark" ? styles.card2 : "card1  mx-4"
                      }
                    >
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <thead className={styles.card_container_heading}>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">User</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody
                              id="clinicListTable"
                              className={styles.card_container_data}
                            >
                              {users?.length === 0 ? (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    No data found
                                  </td>
                                </tr>
                              ) : (
                                users?.map((item, index) => (
                                  <tr key={index}>
                                    <td scope="row">
                                      {(currentPage - 1) * 10 + index + 1}
                                    </td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>
                                      {" "}
                                      {formatPhoneNumber(item?.p_number) ||
                                        "--"}
                                    </td>
                                    <td>{item?.role}</td>
                                    <td>
                                      <span className={styles.action_icons}>
                                        {item?.role === "Clinic Admin" ? (
                                          <div
                                            onClick={() => userOfficelist(item)}
                                          >
                                            <Image
                                              src={Images.user_home}
                                              alt=""
                                            />
                                          </div>
                                        ) : (
                                          <div style={{ width: "12px" }}></div>
                                        )}

                                        <Image
                                          src={Images.editIcon}
                                          alt=""
                                          onClick={() => handleUserTab(item)}
                                        />
                                        {/* </Link> */}
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
                              )}
                            </tbody>
                          </table>
                        </div>
                        {users?.length === 10 && (
                          <div className={styles.pagination}>
                            <button
                              onClick={prevPage}
                              disabled={currentPage === 1}
                            >
                              {isDarkTheme === "dark" ? (
                                <Image src={Images.paginationLeft}></Image>
                              ) : (
                                <Image src={Images.LightpaginationLeft}></Image>
                              )}
                              Prev
                            </button>
                            <span>
                              {pageNumbers.map((pageNumber) => (
                                <button
                                  key={pageNumber}
                                  onClick={() => setCurrentPage(pageNumber)}
                                  className={
                                    currentPage === pageNumber
                                      ? styles.active
                                      : ""
                                  }
                                >
                                  {pageNumber}
                                </button>
                              ))}
                            </span>

                            <button
                              onClick={nextPage}
                              disabled={currentPage === totalPages}
                            >
                              Next
                              {isDarkTheme === "dark" ? (
                                <Image src={Images.paginationright}></Image>
                              ) : (
                                <Image
                                  src={Images.Lightpaginationright}
                                ></Image>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* {openweek && (
                  <>
                    <div
                      className={
                        isDarkTheme === "dark"
                          ? styles.darkHeader2
                          : styles.lightHeader2
                      }
                    >
                      {allUserList?.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No data found
                          </td>
                        </tr>
                      ) : (
                        <>
                          {selectedRole?.map((item, index) => (
                            <tr key={index}>
                              <td scope="row">
                                {(currentPage - 1) * 10 + index + 1}
                              </td>
                              <td>{item?.name}</td>
                              <td>{item?.email}</td>
                              <td>{item?.p_number}</td>
                              <td>{item?.role}</td>
                              <td>
                                <span className={styles.action_icons}>
                                  {item?.role === "Clinic Admin" ? (
                                    <div onClick={() => handleUserClick(item)}>
                                      <Image src={Images.user_home} alt="" />
                                    </div>
                                  ) : (
                                    <div style={{ width: "12px" }}></div>
                                  )}

                                  <Link
                                    href={{
                                      pathname: "/dashboard/edit-user",
                                      query: { item: item?._id },
                                    }}
                                  >
                                    <Image src={Images.editIcon} alt="" />
                                  </Link>
                                  <Image
                                    className={styles.action_icons3}
                                    src={Images.deleteIcon}
                                    alt=""
                                    onClick={() => handleOpen(item?._id)}
                                  />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </div>
                    <div></div>
                  </>
                )} */}
            </>
            {/* // ) : ( */}

            <>
              {/* <UserInfoOfficeList
            //       data={openOffiecList}
            //       changeTab={changeTab}
            //       setOpenOfficeList={setOpenOfficeList}
            //     /> */}
            </>
            {/* // )} */}
          </div>
        </>
      </div>

      {couponAlert && (
        <PoupAlert
          userId={userId}
          setCouponAlert={setCouponAlert}
          couponAlert={couponAlert}
          deleteType="userDelete"
          type="userDelete"
        />
      )}
    </>
  );
};

export default UsersList;
