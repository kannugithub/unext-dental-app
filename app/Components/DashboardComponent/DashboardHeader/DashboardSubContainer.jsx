import React from "react";
import styles from "./subContainer.module.scss";
import ClinicStaff from "../AllDashboardComponents/clinicDashboard/ClinicStaff";
import ClinicDashboard from "../AllDashboardComponents/clinicDashboard/ClinicDashboard";
import AdminDashboard from "../AllDashboardComponents/SuperAdminDashboard/AdminDashboard/AdminDashboard";

const DashboardSubContainer = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default DashboardSubContainer;
