import Image from "next/image";
import React from "react";
import Images from "../../Images/Images";

const StaffRegistration = () => {
  return (
    <>
      <div className="continer">
        <div>
          <Image src={Images.dentalclinic}></Image>
          <div>
            By <Image src={Images.unext_logo}></Image>{" "}
          </div>
        </div>
        <div>Patient Registration</div>
        <div>
          Please fill in your details to help us provide you with personalized
          and efficient healthcare services.
        </div>
        <div>
          <div className={styles.addOffice_container}>
            <div className={styles.add_new}>
              {values?._id ? "Edit" : "Add New"} Patient
            </div>
            <div className={styles.add_new_dental_box}>
              <div className={styles.add_form_box}>
                <div className={styles.office_box}>
                  <Row>
                    <div className="col-md-8">
                      <Row>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>
                            First Name
                          </div>
                          <input
                            type="text"
                            placeholder="Enter First Name"
                            name="patientFirstName"
                            onChange={handleChange}
                            value={values?.patientFirstName || ""}
                          />
                          {errors.patientFirstName && (
                            <div className="error_message">
                              {errors.patientFirstName}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>
                            Last Name
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Last Name"
                            name="patientLastName"
                            onChange={handleChange}
                            value={values?.patientLastName || ""}
                          />
                          {errors.patientLastName && (
                            <div className="error_message">
                              {errors.patientLastName}
                            </div>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>
                            Phone Number
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Phone Number"
                            maxLength="10"
                            name="contact"
                            onChange={handleChange}
                            value={values?.contact || ""}
                          />
                          {errors.contact && (
                            <div className="error_message">
                              {errors.contact}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>Email</div>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                            value={values?.email || ""}
                          />
                          {errors.email && (
                            <div className="error_message">{errors.email}</div>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>
                            Open Balance
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Balance"
                            name="balance"
                            onChange={handleChange}
                            value={values?.balance || ""}
                          />
                          {errors.balance && (
                            <div className="error_message">
                              {errors.balance}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className={styles.office_name_label}>DOB</div>
                          <input
                            type="date"
                            placeholder="Select date"
                            name="dob"
                            onChange={handleChange}
                            value={values?.dob || ""}
                            max={new Date().toISOString().split("T")[0]}
                          />

                          {errors.dob && (
                            <div className="error_message">{errors.dob}</div>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <div className="col-md-12">
                          <div className={styles.office_name_label}>Gender</div>
                          <select
                            name="gender"
                            onChange={handleChange}
                            value={values.gender || ""}
                          >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {errors.gender && (
                            <div className="error_message">{errors.gender}</div>
                          )}
                        </div>
                      </Row>

                      <div className={styles.family_member}>
                        <p> {values?._id ? "Edit" : "Add New"} Family Member</p>
                        <div className={styles.add_member} onClick={addMember}>
                          <Image src={Images.plus_icon}></Image>
                          &nbsp;
                          <span className={styles.family_button}>
                            {values?._id ? "Edit" : "Add New"} Family Member
                          </span>
                        </div>
                      </div>
                      <div className={styles.family_lists}>
                        {members.map((member, index) => (
                          <div className={styles.family_info} key={index}>
                            <div className="col-md-11">
                              <Row>
                                <div className="col-md-4">
                                  <div className={styles.office_name_label}>
                                    First Name
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    // name={`patientName${index}`}
                                    value={member.name}
                                    onChange={(e) => {
                                      const newMembers = [...members];
                                      newMembers[index].name = e.target.value;
                                      setMembers(newMembers);
                                    }}
                                  />
                                  {errors[`patientName${index}`] && (
                                    <div className="error_message">
                                      {errors[`patientName${index}`]}
                                    </div>
                                  )}
                                </div>
                                <div className="col-md-4">
                                  <div className={styles.office_name_label}>
                                    Relation
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Enter Relation"
                                    // name={`relation${index}`}
                                    value={member.relation}
                                    onChange={(e) => {
                                      const newMembers = [...members];
                                      newMembers[index].relation =
                                        e.target.value;
                                      setMembers(newMembers);
                                    }}
                                  />
                                  {errors[`relation${index}`] && (
                                    <div className="error_message">
                                      {errors[`relation${index}`]}
                                    </div>
                                  )}
                                </div>
                                <div className="col-md-4">
                                  <div className={styles.office_name_label}>
                                    Phone Number
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    maxLength="10"
                                    // name={`phoneNumber${index}`}
                                    value={member.phone}
                                    onChange={(e) => {
                                      const newMembers = [...members];
                                      newMembers[index].phone = e.target.value;
                                      setMembers(newMembers);
                                    }}
                                  />
                                  {errors[`phoneNumber${index}`] && (
                                    <div className="error_message">
                                      {errors[`phoneNumber${index}`]}
                                    </div>
                                  )}
                                </div>
                              </Row>
                            </div>
                            <div className="col-md-1">
                              <div
                                className={styles.close_icon}
                                onClick={() => removeMember(index)}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                                    fill="#FF3232"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={styles.img_upload_box}>
                        <div className={styles.img_boxes}>
                          <div
                            className={styles.upload_circle}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                document.getElementById("imageUpload").click();
                              }
                            }}
                          >
                            {selectedProfileImage ? (
                              <Image
                                src={selectedProfileImage}
                                alt="Uploaded Profile Image"
                                width={100}
                                height={100}
                              />
                            ) : profileImageUrl ? (
                              <Image
                                src={profileImageUrl}
                                alt="Profile Image"
                                width={100}
                                height={100}
                              />
                            ) : (
                              <Image
                                src={
                                  isDarkTheme === "dark"
                                    ? Images.thickDownloadIcon
                                    : Images.upload_black
                                }
                                alt=""
                                className={styles.download_icon}
                                width={100}
                                height={100}
                              />
                            )}

                            <input
                              id="imageUpload"
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleProfileImageUpload}
                              style={{ display: "none" }}
                            />
                          </div>
                          <div className={styles.upload_logo}>Upload Image</div>
                          {errors?.profileImage && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "0px",
                                marginBottom: "12px",
                              }}
                            >
                              {errors.profileImage}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.img_upload_box}>
                        <div className={styles.img_boxes}>
                          <div
                            className={styles.upload_circle}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                document
                                  .getElementById("insuranceUpload")
                                  .click();
                              }
                            }}
                          >
                            {isDarkTheme === "dark" ? (
                              <Image
                                src={Images.thickDownloadIcon}
                                alt=""
                                className={styles.download_icon}
                                width={100}
                                height={100}
                              />
                            ) : (
                              <Image
                                src={Images.upload_black}
                                alt=""
                                className={styles.download_icon}
                                width={100}
                                height={100}
                              />
                            )}

                            <input
                              type="file"
                              name="image"
                              accept=".pdf,.docx,.jpg,.jpeg"
                              onChange={handleInsuranceUpload}
                              id="insuranceUpload"
                              multiple // Allow multiple file selection
                              style={{ display: "none" }}
                            />
                          </div>
                          {selectedInsuranceDoc ? (
                            <div className={styles.selected_files_list}>
                              {Array.from(selectedInsuranceDoc).map(
                                (file, index) => (
                                  <div
                                    className={styles.files_list}
                                    key={index}
                                  >
                                    {file.name}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <>
                              {patientData?.data?.insurance_docs.map(
                                (url, index) => {
                                  const urlObj = new URL(url);
                                  const pathnameSegments =
                                    urlObj.pathname.split("/");
                                  const fileName =
                                    pathnameSegments[
                                      pathnameSegments.length - 1
                                    ];

                                  return (
                                    <div
                                      className={styles.selected_files_list}
                                      key={index}
                                    >
                                      <div className={styles.files_list}>
                                        {fileName}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          )}
                          <div className={styles.upload_logo}>
                            Upload The Insurance Doc
                          </div>
                          {errors?.insuranceDoc && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "0px",
                                marginBottom: "12px",
                              }}
                            >
                              {errors.insuranceDoc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
              <div className={styles.add_new_dental_btn}>
                <button onClick={submitPatientInfo} disabled={sendDataLoading}>
                  {values?._id ? "Edit" : "Add New"} Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffRegistration;
