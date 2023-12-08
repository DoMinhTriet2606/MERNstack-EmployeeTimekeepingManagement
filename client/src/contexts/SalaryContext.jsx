import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { SalaryReducer } from "../reducers/SalaryReducer";
import {
    CREATE_SALARY,
    GET_ALL_SALARIES,
    GET_USER_SALARIES,
    UPDATE_SALARY,
    apiUrl,
} from "./constants";

export const SalaryContext = createContext();

const SalaryContextProvider = ({ children }) => {
    const [salaryState, dispatch] = useReducer(SalaryReducer, {
        timekeeper: [],
        totalEarnings: 0,
        monthlyEarnings: 0,
        user: null,
        salaries: [],
    });

    const [salaryTemp, setSalaryTemp] = useState([]);

    // for Manager
    const getAllSalary = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/users/salary`);
            if (response.data.success) {
                dispatch({
                    type: GET_ALL_SALARIES,
                    payload: response.data.salaries,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // for Staff
    const getSalary = async (userId) => {
        try {
            const response = await axios.get(`${apiUrl}/user/salary/${userId}`);
            if (response.data.success) {
                dispatch({
                    type: GET_USER_SALARIES,
                    payload: response.data.salaries,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const createSalary = async (userId) => {
        try {
            const response = await axios.post(`${apiUrl}/user/salary/create`, { userId });
            if (response.data.success) {
                dispatch({ type: CREATE_SALARY, payload: response.data.salary });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: "You already generated the salary" };
        }
    };

    const updateSalary = async (salaryData) => {
        try {
            const response = await axios.put(`${apiUrl}/user/salary/update`, salaryData);
            if (response.data.success) {
                dispatch({
                    type: UPDATE_SALARY,
                    payload: response.data.salary,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: "Error updating" };
        }
    };

    const SalaryContextData = {
        salaryState,
        salaryTemp,
        setSalaryTemp,
        getAllSalary,
        getSalary,
        createSalary,
        updateSalary,
    };
    return <SalaryContext.Provider value={SalaryContextData}>{children}</SalaryContext.Provider>;
};

export default SalaryContextProvider;
