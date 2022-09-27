import { ACTIONTYPES } from './actionTypes';

export const GET_ALL_COUNTRIES_INITIAL_STATE = {
    loading: false,
    all_countries: [],
    countries: [],
    error: false
};

export const countriesReducer = (state, action) => {
    switch (action.type) {
        case ACTIONTYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                all_countries: [],
                countries: [],
            };
        case ACTIONTYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                all_countries: action.payload,
                countries: action.payload
            };
        case ACTIONTYPES.SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload
            }
        case ACTIONTYPES.FETCH_ERROR:
            return {
                error: true,
                loading: false,
                all_countries: [],
                countries: [],
                regions: []
            };
        default:
            return state;
    }
}