import React, { useContext, useEffect } from "react";
import Loader from "./Loader";

import "../assets/css/dashboard/dashboard.css";
import { InfoContext } from "../contexts/InfoContext";
import { ShiftContext } from "../contexts/ShiftContext";
import { ShiftAdminContext } from "../contexts/ShiftAdminContext";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardUser from "../pages/DashboardUser";
import { AuthContext } from "../contexts/AuthContext";
import { SalaryContext } from "../contexts/SalaryContext";

const Dashboard = () => {
    useEffect(() => {
        getInfo();
        getShift();
        getAllShifts();
        getAllSalary();
    }, []);

    // State
    const {
        authState: { user },
    } = useContext(AuthContext);

    const {
        infoState: { info, infoLoading },
        getInfo,
    } = useContext(InfoContext);

    const {
        shiftState: { shiftQuantity, shifts, shiftLoading },
        getShift,
    } = useContext(ShiftContext);

    const {
        shiftAdminState: { totalShiftUser, shiftsTable },
        getAllShifts,
    } = useContext(ShiftAdminContext);

    const {
        salaryState: { salaries },
        getAllSalary,
    } = useContext(SalaryContext);

    const userShift = shifts.map((shift) => shift.shiftTime);
    const shiftData = { shiftQuantity, userShift };
    let userData = {
        firstName: "",
        lastName: "unknown",
        gender: "unknown",
        birth: "unknown",
        email: "unknown",
        role: "unknown",
        address: "unknown",
    };
    if (info.length > 0) {
        userData = info[0];
    }

    let totalShifts = 0;
    if (shiftsTable.length > 0) {
        shiftsTable.forEach((item) => {
            totalShifts += item.shiftQuantity;
        });
    }

    let body = null;
    if (infoLoading || shiftLoading) {
        body = (
            <>
                <div className="container">
                    <Loader />
                </div>
            </>
        );
    } else {
        if (userData.role === "Manager")
            body = (
                <DashboardAdmin
                    userData={userData}
                    shiftData={shiftData}
                    adminTotalUser={totalShiftUser}
                    adminTotalShift={totalShifts}
                    shiftsTable={shiftsTable}
                    salaries={salaries}
                />
            );
        else body = <DashboardUser userId={user._id} userData={userData} shiftData={shiftData} />;
    }

    return <>{body}</>;
};

export default Dashboard;
