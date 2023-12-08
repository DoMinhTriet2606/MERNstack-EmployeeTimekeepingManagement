import { createContext, useReducer, useState } from "react";
import { ShiftAdminReducer } from "../reducers/ShiftAdminReducer";
import axios from "axios";
import { GET_ALL_SHIFT, apiUrl } from "./constants";

export const ShiftAdminContext = createContext();

const ShiftAdminContextProvider = ({ children }) => {
    // State
    const [shiftAdminState, dispatch] = useReducer(ShiftAdminReducer, {
        totalShiftUser: 0,
        shiftsTable: [],
        AdminLoading: true,
    });

    const [deleteShiftArray, setDeleteShiftArray] = useState([]);

    // Admin get all shift users
    const getAllShifts = async (req, res) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/shifts`);
            if (response.data.success) {
                dispatch({
                    type: GET_ALL_SHIFT,
                    payload: response.data.shiftAdmin,
                });
            } else console.log("Failed to get shift");
        } catch (error) {
            console.error(error);
        }
    };

    // Update shift after deleting shift
    const deleteShift = async (shiftId, shiftTime) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/shift/${shiftId}`, {
                shiftTime: shiftTime,
            });
            // if (response.data.success) {
            //     dispatch({
            //         type: DELETE_SHIFT,
            //         payload: response.data.shift,
            //     });
            // }
            return response.data;
        } catch (error) {
            console.log("hello", error);
        }
    };

    const ShiftAdminContextData = {
        shiftAdminState,
        getAllShifts,
        deleteShift,
        deleteShiftArray,
        setDeleteShiftArray,
    };
    return (
        <ShiftAdminContext.Provider value={ShiftAdminContextData}>
            {children}
        </ShiftAdminContext.Provider>
    );
};

export default ShiftAdminContextProvider;
