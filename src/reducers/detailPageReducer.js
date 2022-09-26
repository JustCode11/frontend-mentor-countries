import { ACTIONTYPES } from './actionTypes';

export const DETAIL_PAGE_INITIAL_STATE = {
    country: {},
    borderCountries: [],
    loading: true,
    error: false
}

export const detailPageReducer = (state, action) => {
    switch (action.type) {
        case ACTIONTYPES.FETCH_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case ACTIONTYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                country: action.payload
            }
        case ACTIONTYPES.FETCH_BORDERCOUNTRIES:
            return {
                ...state,
                borderCountries: action.payload
            }
        case ACTIONTYPES.FETCH_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
                //country: {},
                //borderCountries: []
            }
        default:
            return state;
    }
}