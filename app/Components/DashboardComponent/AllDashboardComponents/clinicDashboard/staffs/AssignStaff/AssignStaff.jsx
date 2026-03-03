import React, { useEffect, useState } from "react";
import styles from "./assignStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { assignStaffOnClinic } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";

const AssignStaff = ({ setOpenAssignStaff }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clinicId, setClinicId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const staffListData = useAppSelector((state) => state.clinic.staffListData);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSendAssign = async () => {
    const staffIds = selectedItems.map((item) => item._id);
    const data = {
      staffIds: staffIds,
    };
    try {
      const actionResult = await dispatch(
        assignStaffOnClinic({ clinicId, data })
      );
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setOpenAssignStaff(false);
      }
    } catch (error) {
      toast.error("An error occurred while assigning the staff.");
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.create_appointment_control}>
          <div
            className={styles.close_icons}
            onClick={() => setOpenAssignStaff(false)}
          >
            {isDarkTheme === "dark" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.09102 10.9077C3.20768 11.0244 3.32435 11.0827 3.49935 11.0827C3.67435 11.0827 3.79102 11.0244 3.90768 10.9077L6.99935 7.81602L10.091 10.9077C10.2077 11.0244 10.3827 11.0827 10.4994 11.0827C10.616 11.0827 10.791 11.0244 10.9077 10.9077C11.141 10.6744 11.141 10.3244 10.9077 10.091L7.81602 6.99935L10.9077 3.90768C11.141 3.67435 11.141 3.32435 10.9077 3.09102C10.6744 2.85768 10.3243 2.85768 10.091 3.09102L6.99935 6.18268L3.90768 3.09102C3.67435 2.85768 3.32435 2.85768 3.09102 3.09102C2.85768 3.32435 2.85768 3.67435 3.09102 3.90768L6.18268 6.99935L3.09102 10.091C2.85768 10.3244 2.85768 10.6744 3.09102 10.9077Z"
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
              >
                <path
                  d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
          <>
            <div className={styles.select_patient}>Select Staff</div>
            <div className={styles.search_box}>
              <Image src={Images.blue_search} alt="search" />
              <input
                type="text"
                name=""
                placeholder="Type staff name or phone number"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            {selectedItems?.length > 0 && (
              <Row className={styles.selected_items_row}>
                <div className="col-lg-10">
                  <div className={styles.selected_items_list}>
                    {selectedItems.map((item, index) => (
                      <div className={styles.selected_item} key={index}>
                        <span>{item.name}</span>
                        <button
                          onClick={() =>
                            setSelectedItems(
                              selectedItems.filter((_, i) => i !== index)
                            )
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-2">
                  <div
                    className={styles.send_btn}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button onClick={handleSendAssign}>Send</button>
                  </div>
                </div>
              </Row>
            )}

            {staffListData?.data
              ?.filter((item) => {
                return (
                  (item &&
                    item.name &&
                    item.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())) ||
                  (item.p_number && item.p_number.includes(searchTerm))
                );
              })
              .map((item, key) => (
                <div
                  className={styles.patient_list}
                  key={key}
                  onClick={() => {
                    if (
                      !selectedItems.find(
                        (selectedItem) => selectedItem.name === item.name
                      )
                    ) {
                      setSelectedItems([...selectedItems, item]);
                    }
                  }}
                >
                  <div className={styles.patient_name}>
                    {item?.name || "--"}
                  </div>
                  <div className={styles.patient_number}>
                  {formatPhoneNumber(item?.p_number || "--")}
                  </div>
                </div>
              ))}
          </>
        </div>
      </div>
    </>
  );
};

export default AssignStaff;
