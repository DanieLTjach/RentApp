import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {

    const navigate = useNavigate();

    const handleAddApartment = () => {
        const authToken = Cookies.get('user_id');
        if (authToken) {
            navigate('/addApartment');
        } else {
            navigate('/login');
        }
    };

    const handleProfileClick = () => {
        const authToken = Cookies.get('user_id');
        console.log(authToken);
        if (authToken) {
            navigate('/profile');
        } else {
            navigate('/login');  
        }
    };

    return (
        <header className="header">
            <div className="header_container">
                <div className="header_container-logo">
                    <Link to="/">
                        <img src="/img/img-catalog/header/logo.svg" alt="Logo" />
                    </Link>
                </div>
                <div className="header-menu_icons">
                    <div className="menu_icons-icon">
                        <img 
                            src="/img/img-catalog/header/Account.svg" 
                            alt="icon"
                            style={{ cursor: 'pointer' }}
                            onClick={handleProfileClick}
                        />
                    </div>
                    <div className="menu_icons-icon">
                        <button className="favorite-button" onClick={handleAddApartment}>Додати квартиру</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
