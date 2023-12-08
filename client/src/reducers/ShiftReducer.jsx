import {
    FIND_USER_SUCCESS,
    GET_SHIFT_FAIL,
    GET_SHIFT_SUCCESS,
    GET_WORKSHIFT_SUCCESS,
    POST_SHIFT_FAIL,
    POST_SHIFT_SUCCESS,
    UPDATE_SHIFT,
} from "../contexts/constants";

export const ShiftReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case POST_SHIFT_SUCCESS:
            return {
                ...state,
                shifts: [...state.shifts, payload.shifts],
                shiftQuantity: payload.shiftQuantity,
            };
        case POST_SHIFT_FAIL:
            return {
                ...state,
                shifts: [],
            };
        case GET_SHIFT_SUCCESS:
            return {
                ...state,
                shiftQuantity: payload.shiftQuantity,
                shifts: payload.shifts,
                shiftLoading: false,
            };
        case GET_SHIFT_FAIL:
            return {
                ...state,
                shifts: [],
                shiftLoading: false,
            };
        case UPDATE_SHIFT:
            return payload;
        case FIND_USER_SUCCESS:
            return {
                ...state,
                user: payload.user,
            };
        case GET_WORKSHIFT_SUCCESS:
            return {
                ...state,
                workShift: payload,
                shiftLoading: false,
            };

        default:
            return state;
    }
};
