import {
    CREATE_SALARY,
    GET_ALL_SALARIES,
    GET_USER_SALARIES,
    UPDATE_SALARY,
} from "../contexts/constants";

export const SalaryReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_SALARY:
            return payload;
        case UPDATE_SALARY:
            return payload;
        case GET_ALL_SALARIES:
            return {
                ...state,
                salaries: payload,
            };
        case GET_USER_SALARIES:
            return payload;
        default:
            return state;
    }
};
