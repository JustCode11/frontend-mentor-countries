import React, { useEffect, useReducer } from 'react';
import { Link } from "react-router-dom";
import { ACTIONTYPES } from '../reducers/actionTypes';
import { searchFormReducer, SEARCH_FORM_INITIAL_STATE } from '../reducers/searchFormReducer';
import { countriesReducer, GET_ALL_COUNTRIES_INITIAL_STATE } from '../reducers/countriesReducer';
import SearchForm from '../components/SearchForm';
import CountryCard from '../components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';

const MainPage = () => {
    const [searchFormState, searchFormDispatch] = useReducer(searchFormReducer, SEARCH_FORM_INITIAL_STATE);
    const [state, dispatch] = useReducer(countriesReducer, GET_ALL_COUNTRIES_INITIAL_STATE);
    useEffect(() => {
        let fetchAllCountries = 'https://restcountries.com/v3.1/all';
        let fetchCountriesByRegion = `https://restcountries.com/v3.1/region/${searchFormState.selectedRegion}`;
        async function fetchCountries() {
            dispatch({ type: ACTIONTYPES.FETCH_START });
            await fetch(searchFormState.selectedRegion === "" ? fetchAllCountries : fetchCountriesByRegion)
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: ACTIONTYPES.FETCH_SUCCESS, payload: data });
                })
                .catch((err) => {
                    dispatch({ type: ACTIONTYPES.FETCH_ERROR });
                    console.log(err.message);
                });
        }
        fetchCountries();
    }, []);

    useEffect(() => {
        let filteredCountries = state.all_countries.filter((c) => {
            return c.region.toLowerCase().indexOf(searchFormState.selectedRegion.toLowerCase()) === 0;
        });
        if (searchFormState.searchTerm !== "") {
            filteredCountries = filteredCountries.filter((c) => {
                //console.log(c);
                return c.name.common.toLowerCase().indexOf(searchFormState.searchTerm.toLowerCase()) === 0;
            });
        }
        dispatch({ type: ACTIONTYPES.SEARCH_COUNTRY, payload: filteredCountries });
    }, [searchFormState.searchTerm, searchFormState.selectedRegion]);
    return (
        <div className="container">
            <SearchForm searchFormState={searchFormState} searchFormDispatch={searchFormDispatch} />
            {state.loading ? (<LoadingSpinner />) :
                state.error ? (<Error />) :
                    (
                        <>
                            <div className="mainPageContainer">
                                {state.countries.map(country => {
                                    return (
                                        <Link
                                            className="mainPageContainer__link"
                                            key={country.name.common}
                                            to={`/${country.cca2}`}
                                        >
                                            <CountryCard country={country} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </>
                    )}
        </div>
    )
}

export default MainPage