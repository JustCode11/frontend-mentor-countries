import { ACTIONTYPES } from './actionTypes';

export const SEARCH_FORM_INITIAL_STATE = {
    searchTerm: "",
    selectedRegion: ""
};

export const searchFormReducer = (state, action) => {
    switch (action.type) {
        case ACTIONTYPES.CHANGE_SEARCHTERM:
            return {
                ...state,
                searchTerm: action.payload
            };
        case ACTIONTYPES.CHANGE_SELECTEDREGION:
            return {
                ...state,
                selectedRegion: action.payload
            };
        default:
            return state;
    }
};