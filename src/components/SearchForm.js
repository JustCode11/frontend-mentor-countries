import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ACTIONTYPES } from "../reducers/actionTypes";

function useOutsideClickHandler(ref, setOpen) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, setOpen]);
}

const SearchForm = ({ searchFormState, searchFormDispatch }) => {
    const [open, setOpen] = useState(false);
    const [regions, setRegions] = useState([]);
    const [dropDownText, setDropDownText] = useState("Filter by Region");

    const wrapperRef = useRef(null);
    useOutsideClickHandler(wrapperRef, setOpen);

    useEffect(() => {
        async function fetchRegionsData() {
            await fetch('https://restcountries.com/v3.1/all')
                .then((res) => res.json())
                .then((data) => {
                    let regionsArray = [];
                    data.filter(country => {
                        const duplicateRegion = regionsArray.includes(country.region);
                        if (!duplicateRegion) {
                            regionsArray.push(country.region);
                            return true;
                        }
                        return false;
                    });
                    setRegions(regionsArray);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        fetchRegionsData();
    }, [])

    const openDropDownMenu = () => {
        setOpen(!open);
    }
    const selectRegion = (event) => {
        if (event.target.innerHTML !== "Filter by Region") {
            searchFormDispatch({ type: ACTIONTYPES.CHANGE_SELECTEDREGION, payload: event.target.innerHTML });
        } else {
            searchFormDispatch({ type: ACTIONTYPES.CHANGE_SELECTEDREGION, payload: "" });
        }
        setDropDownText(event.target.innerHTML);
        setOpen(false);
    }
    return (
        <div className="searchForm">
            <div className="searchForm__searchInputContainer">
                <FontAwesomeIcon className="searchForm__searchInputContainer__searchIcon" icon={faMagnifyingGlass} />
                <input
                    className="searchForm__searchInputContainer__searchInput"
                    value={searchFormState.searchTerm}
                    onChange={(e) => searchFormDispatch({ type: ACTIONTYPES.CHANGE_SEARCHTERM, payload: e.target.value })}
                    type="text"
                    placeholder="Search for a country..."
                />
            </div>
            <div className="searchForm__dropDownContainer" ref={wrapperRef}>
                <div
                    className={`searchForm__dropDownContainer__dropDownInput ${open ? "open" : ""}`}
                    onClick={openDropDownMenu}>{dropDownText}</div>
                <div className={`searchForm__dropDownContainer__listContainer ${open ? "open" : ""}`}>
                    <ul className="searchForm__dropDownContainer__listContainer__list">
                        {dropDownText !== "Filter by Region" ? (
                            <li
                                className="searchForm__dropDownContainer__listContainer__list__item"
                                onClick={selectRegion}
                            >
                                Filter by Region
                            </li>
                        ) : null}
                        {regions.map(region => {
                            return (
                                <li
                                    key={region}
                                    className="searchForm__dropDownContainer__listContainer__list__item"
                                    onClick={selectRegion}
                                >{region}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchForm