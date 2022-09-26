import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faRegularMoon } from '@fortawesome/free-regular-svg-icons'

const Header = ({ theme, changeTheme }) => {
    return (
        <header className="header container">
            <Link to="/">
                <h1 className="header__title">Where in the world?</h1>
            </Link>
            <div
                className="header__darkModeContainer"
                onClick={changeTheme}
            >
                {theme === "light"
                    ? <FontAwesomeIcon icon={faRegularMoon} />
                    : <FontAwesomeIcon icon={faMoon} />}
                <span>Dark Mode</span>
            </div>
        </header>
    )
}

export default Header