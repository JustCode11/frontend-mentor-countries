import React, { useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from "react-router-dom";
import { ACTIONTYPES } from '../reducers/actionTypes';
import { DETAIL_PAGE_INITIAL_STATE, detailPageReducer } from '../reducers/detailPageReducer';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';

const DetailPage = () => {
    const navigate = useNavigate();
    let { name } = useParams();
    let none = "No data";
    const [state, dispatch] = useReducer(detailPageReducer, DETAIL_PAGE_INITIAL_STATE);
    useEffect(() => {
        function resolvePromises(res) {
            let promises = res.map(item => item.json());
            return Promise.all(promises);
        }
        function saveBorderCountries(data) {
            let bcArray = data.map(arr => arr[0]);
            dispatch({ type: ACTIONTYPES.FETCH_BORDERCOUNTRIES, payload: bcArray });
        }
        async function fetchData() {
            dispatch({ type: ACTIONTYPES.FETCH_START });
            await fetch(`https://restcountries.com/v3.1/alpha/${name}`)
                .then((res) => res.json())
                .then((data) => {
                    let request = data[0];
                    dispatch({ type: ACTIONTYPES.FETCH_SUCCESS, payload: request });
                    if (request.borders) {
                        const arrOfPromises = request.borders.map(item => fetch(`https://restcountries.com/v3.1/alpha/${item}`));
                        return Promise.all(arrOfPromises)
                            .then(resolvePromises)
                            .then(saveBorderCountries);
                    }
                    return true;
                })
                .catch((err) => {
                    console.log(err.message);
                    dispatch({ type: ACTIONTYPES.FETCH_ERROR });
                })
        }
        fetchData();
    }, [name]);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className="container-smaller">
            <button
                onClick={() => navigate(-1)}
                className="backButton"
            >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <span>Back</span>
            </button >
            {state.loading ? (<LoadingSpinner />) :
                state.error ? (<Error />) : (
                    <div className="detailPageContainer">
                        <div className="detailPageContainer__top">
                            <img
                                src={state.country.flags.png}
                                alt={`${state.country.name.common} Flag`}
                            />
                        </div>
                        <div className="detailPageContainer__bottom">
                            <h2 className="detailPageContainer__bottom__headline">{state.country.name.common}</h2>
                            <div className="detailPageContainer__bottom__infos">
                                <div className="detailPageContainer__bottom__infos__top">
                                    <p><span>Native Name:</span> {state.country.name.nativeName ? state.country.name.nativeName[Object.keys(state.country.name.nativeName)[Object.keys(state.country.name.nativeName).length - 1]].common : none}</p>
                                    <p><span>Population:</span> {state.country.population ? numberWithCommas(state.country.population) : none}</p>
                                    <p><span>Region:</span> {state.country.region ? state.country.region : none}</p>
                                    <p><span>Sub Region:</span> {state.country.subregion ? state.country.subregion : none}</p>
                                    <p><span>Capital:</span> {state.country.capital ? state.country.capital[0] : none}</p>
                                </div>
                                <div className="detailPageContainer__bottom__infos__bottom">
                                    <p><span>Top Level Domain:</span> {state.country.tld ? state.country.tld.join(', ') : none}</p>
                                    <p><span>Currencies:</span> {state.country.currencies ? state.country.currencies[Object.keys(state.country.currencies)[0]].name : none}</p>
                                    <p><span>Languages:</span> {state.country.languages ? Object.keys(state.country.languages).map(key => state.country.languages[key]).join(', ') : none}</p>
                                </div>
                            </div>
                            <div className="detailPageContainer__bottom__borderCountriesContainer">
                                <p className="detailPageContainer__bottom__borderCountriesContainer__headline">Border Countries:</p>
                                <div className="detailPageContainer__bottom__borderCountriesContainer__area">
                                    {state.borderCountries.map((borderCountry) => {
                                        return (
                                            <Link
                                                key={borderCountry.name.common}
                                                to={`/${borderCountry.cca2}`}
                                            >
                                                <button className="detailPageContainer__bottom__borderCountriesContainer__area__button">{borderCountry.name.common}</button>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div >
    )
}

export default DetailPage