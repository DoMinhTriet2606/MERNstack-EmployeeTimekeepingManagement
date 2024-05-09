import React, { useContext, useEffect, useState } from "react";
import { ShiftContext } from "../contexts/ShiftContext";
import ShiftRegister from "../components/shift/ShiftRegister";
import "../assets/css/shift/shift.css";
import "../assets/css/button.css";
import ShiftShow from "../components/shift/ShiftShow";
import Loader from "./Loader";
import ShiftShowAssigned from "../components/shift/ShiftShowAssigned";

const Shift = () => {
    const {
        shiftState: { registered_shifts, assigned_shifts, shiftLoading },
        getTimeTable,
    } = useContext(ShiftContext);

    const [showComponent, setShowComponent] = useState("A");

    const showComponentA = () => {
        setShowComponent("A");
    };

    const showComponentB = () => {
        setShowComponent("B");
    };

    useEffect(() => {
        getTimeTable();
    }, []);

    let body = null;
    if (shiftLoading) {
        body = (
            <div className="container">
                <Loader />
            </div>
        );
    }
    // else if (user !== null) {
    //     body = <ShiftUpdater updateData={registered_shifts} />;
    // }
    else if (registered_shifts.length === 0) {
        body = (
            <div className="home-content">
                <ShiftRegister />
            </div>
        );
    } else {
        body = (
            <div className="home-content">
                <div className="button__container-shift shift-user">
                    <button onClick={showComponentA}>Register</button>
                    <button onClick={showComponentB}>Assign</button>
                </div>
                <div>
                    {showComponent === "A" && <ShiftShow shifts={registered_shifts} />}
                    {showComponent === "B" && <ShiftShowAssigned shifts={assigned_shifts} />}
                </div>
            </div>
        );
    }

    return <>{body}</>;
};

export default Shift;
