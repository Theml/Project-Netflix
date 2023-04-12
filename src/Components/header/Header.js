import React from "react";
import UserIcon from "./Img/among_us_netflix_icon_156927.png"
import './Header.css';

function Header ({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/150px-Netflix_2015_logo.svg.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={UserIcon} alt="Usuário" />
                </a>
            </div>
        </header>
    )
}

export default Header