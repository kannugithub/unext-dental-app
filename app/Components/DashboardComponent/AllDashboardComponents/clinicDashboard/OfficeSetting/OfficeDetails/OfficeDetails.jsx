import React, { useEffect, useState } from "react";
import style from "./officeDetails.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import styles from "../../../../DashboardHeader/subContainer.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";

const OfficeDetails = () => {
  const [values, setValues] = useState({});
  const [editOffice, setEditOffice] = useState(false);

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleInputChnage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmitOfficeDetails = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (singleClinicData) {
      setValues({
        business_name: singleClinicData?.data?.clinic_name,
        office_location: singleClinicData?.data?.clinic_address,
      });
    }
  }, [singleClinicData]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? style.darkHeader : style.lightHeader
        }
      >
        <div className={style.card_container}>
          <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2 mx-4"}>
            <div className="card-body">
              <div className={style.office_details_title}>Office Details</div>
              <div className={style.office_details}>
                <div className={style.dental_bussines}>
                  <div>Dental Business Name</div>
                  <input
                    name="business_name"
                    type="text"
                    placeholder="Demo Dental"
                    value={values.business_name || ""}
                    onChange={handleInputChnage}
                    readOnly
                  />
                </div>
                <div className={style.dental_bussines_office}>
                  <div className={style.office_location_tag}>
                    Office Location
                  </div>
                  <div className={style.edit_office_box}>
                    <input
                      name="office_location"
                      type="text"
                      placeholder="56 Glassford Street Glasgow G1 1ULNew York"
                      value={values.office_location || ""}
                      onChange={handleInputChnage}
                      readOnly
                    />
                    {/* {editOffice ? (
                      <div
                        className={style.edit_office_btn}
                        onClick={() => setEditOffice(false)}
                      >
                        <span>send</span>
                      </div>
                    ) : (
                      <div
                        className={style.edit_office}
                        onClick={() => setEditOffice(true)}
                      >
                        {" "}
                        <Image
                          src={Images?.bluePencelIcon}
                          alt="pencel icon"
                        />{" "}
                        <span>Edit</span>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeDetails;
