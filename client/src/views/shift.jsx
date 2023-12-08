import React, { useContext, useEffect } from "react";
import { ShiftContext } from "../contexts/ShiftContext";
import ShiftRegister from "../components/shift/ShiftRegister";
import "../assets/css/shift/shift.css";
import "../assets/css/button.css";
import ShiftShow from "../components/shift/ShiftShow";
import Loader from "./Loader";
import ShiftUpdater from "../components/shift/ShiftUpdater";

const Shift = () => {
    const {
        shiftState: { user, shifts, shiftLoading },
        getShift,
    } = useContext(ShiftContext);

    useEffect(() => {
        getShift();
    }, []);

    let body = null;
    if (shiftLoading) {
        body = (
            <div className="container">
                <Loader />
            </div>
        );
    } else if (user !== null) {
        body = <ShiftUpdater updateData={shifts} />;
    } else if (shifts.length === 0) {
        body = <ShiftRegister />;
    } else {
        body = <ShiftShow shifts={shifts} />;
    }

    return <>{body}</>;
};

export default Shift;
