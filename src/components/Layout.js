import React, { useState, useEffect } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const changeTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light");
    }

    useEffect(() => {
        if (theme === "light") {
            document.body.style.backgroundColor = 'hsl(0, 0%, 98%)';
        } else {
            document.body.style.backgroundColor = 'hsl(207, 26%, 17%)';
        }
    }, [theme])
    return (
        <div className="main-component" id={theme}>
            <Header theme={theme} changeTheme={changeTheme} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout