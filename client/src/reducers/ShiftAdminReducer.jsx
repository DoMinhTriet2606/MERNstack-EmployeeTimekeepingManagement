import { DELETE_SHIFT, GET_ALL_SHIFT } from "../contexts/constants";

export const ShiftAdminReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_SHIFT:
            return {
                ...state,
                totalShiftUser: payload.length,
                shiftsTable: payload,
                AdminLoading: false,
            };
        case DELETE_SHIFT:
            return {
                ...state,
                totalShiftUser: payload.length,
                shiftsTable: [...state.shiftsTable, payload],
            };
        default:
            return state;
    }
};
