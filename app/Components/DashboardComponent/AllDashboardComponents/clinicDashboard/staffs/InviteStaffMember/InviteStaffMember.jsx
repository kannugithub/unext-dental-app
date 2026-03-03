import React, { useEffect, useState } from "react";
import styles from "./inviteMember.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { sendInviteStaffMember } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch, useSelector } from "react-redux";

const InviteStaffMember = ({ setOpenInviteMember }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberList, setMobileNumberList] = useState([]);
  const [loading, setLoading] = useState(false);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
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

  const handleInputChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedNumber = input.startsWith("1")
      ? `+1${input.substring(1)}`
      : `+1${input}`;
    setMobileNumber(formattedNumber);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMobileNumber();
    }
  };

  const addMobileNumber = () => {
    const formattedNumber = mobileNumber.startsWith("+1")
      ? mobileNumber
      : `+1${mobileNumber}`;
    if (formattedNumber.length === 12) {
      setMobileNumberList([...mobileNumberList, formattedNumber]);
      setMobileNumber("");
    } else {
      toast.error("Please enter a valid mobile number.");
    }
  };
  console.log(mobileNumberList, "mobileNumberList");

  const removeMobileNumber = (index) => {
    const newList = [...mobileNumberList];
    newList.splice(index, 1);
    setMobileNumberList(newList);
  };

  const handleSendLink = async () => {
    const data = {
      clinicId: clinicId,
      staffNumber: mobileNumber,
      clinicNumber: singleClinicData?.data?.clinic_phone,
    };

    setLoading(true);
    try {
      const actionResult = await dispatch(sendInviteStaffMember(data));
      const { success, message } = actionResult.payload;
      if (success) {
        setLoading(false);
        setOpenInviteMember(false);
        toast.success(message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid phone number");
    }
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.AddNewCard_wrapper}>
        <div className={styles.AddNewCard_img} style={{ cursor: "pointer" }}>
          {isDarkTheme === "dark" ? (
            <Image
              src={Images.whiteclose_icon}
              onClick={() => setOpenInviteMember(false)}
            ></Image>
          ) : (
            <Image
              src={Images.blackCrossIcon}
              onClick={() => setOpenInviteMember(false)}
            ></Image>
          )}
        </div>
        <div className={styles.main_wrapper}>
          <div className={styles.headline}>
            <div className={styles.invite_member}>Invite Member</div>
          </div>
          <div className={styles.card_wrapper}>Mobile Number</div>
          <div className={styles.card_wrapper_text}>
            <div className="col-md-12">
              <input
                type="text"
                maxLength={12}
                placeholder="Enter mobile Number"
                value={mobileNumber}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                pattern="\d*" // Allow only numbers
              ></input>
            </div>
          </div>
          <div className={styles.numbers_list}>
            {mobileNumberList.map((number, index) => (
              <div className={styles.entered_numbers} key={index}>
                <div className={styles.selected_item}>
                  {number}
                  <div
                    className={styles.cross_icon}
                    onClick={() => removeMobileNumber(index)}
                  >
                    x
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Row>
            <Col>
              <button onClick={handleSendLink} disabled={loading}>
                Send Link
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InviteStaffMember;
