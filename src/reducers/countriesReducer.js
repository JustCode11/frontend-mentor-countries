import { ACTIONTYPES } from './actionTypes';

export const GET_ALL_COUNTRIES_INITIAL_STATE = {
    loading: false,
    countries: [],
    error: false
};

export const countriesReducer = (state, action) => {
    switch (action.type) {
        case ACTIONTYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                countries: [],
            };
        case ACTIONTYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.payload
            };
        case ACTIONTYPES.FETCH_ERROR:
            return {
                error: true,
                loading: false,
                countries: [],
                regions: []
            };
        default:
            return state;
    }
}