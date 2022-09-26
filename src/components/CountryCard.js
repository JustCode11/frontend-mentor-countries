import React from 'react';

const CountryCard = ({ country }) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="countryCardContainer">
            <div className="countryCardContainer__top">
                <img
                    src={country.flags.png}
                    alt={`${country.name.common} Flag`}
                />
            </div>
            <div className="countryCardContainer__bottom">
                <h2>{country.name.common}</h2>
                <p><span>Population:</span> {numberWithCommas(country.population)}</p>
                <p><span>Region:</span> {country.region}</p>
                <p><span>Capital:</span> {country.capital}</p>
            </div>
        </div>
    )
}

export default CountryCard