import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Ringgroup,
  SwitchRinggroup,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";

const RingGroup = () => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [clinicId, setClinicId] = useState();
  const dispatch = useDispatch();
  const [toggles, setToggles] = useState({});

  const RinggroupData = useAppSelector((state) => state?.clinic?.RinggroupData);
  const employee_id = RinggroupData?.data[0]?._id;

  console.log("employee_id", employee_id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      dispatch(Ringgroup(clinicId));
    }
  }, [clinicId, dispatch]);

  useEffect(() => {
    if (RinggroupData?.data) {
      const initialToggles = {};
      RinggroupData.data.forEach((item) => {
        initialToggles[item._id] = item.call;
      });
      setToggles(initialToggles);
    }
  }, [RinggroupData]);

  const handleToggle = (id) => {
    const newStatus = !toggles[id];
    setToggles((prevToggles) => ({
      ...prevToggles,
      [id]: newStatus,
    }));

    // Dispatch the SwitchRinggroup action
    dispatch(SwitchRinggroup({ call: newStatus, employee_id }));
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.dashboard_sub_conatiner}>
        <div className={styles.dashSub_blue}>
          <div className={styles.compo_name}>
            <span>Ring Groups</span>
          </div>
        </div>
        <div className={styles.card_container}>
          <div
            className={isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"}
          >
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className={styles.card_container_heading}>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col" style={{ textAlign: "end" }}>
                        Disable Extension
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    id="clinicListTable"
                    className={styles.card_container_data}
                  >
                    {RinggroupData?.data?.length === 0 ? (
                      <tr>
                        <td colSpan="5">No data found</td>
                      </tr>
                    ) : (
                      RinggroupData?.data.map((item, key) => (
                        <tr key={key}>
                          <td scope="row">{key + 1}</td>
                          <td>{item?.name || "--"}</td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              className={styles.toggle_wrapper}
                              onClick={() => handleToggle(item._id)}
                            >
                              <input
                                type="checkbox"
                                checked={toggles[item._id]}
                                readOnly
                              />
                              <label></label>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingGroup;
