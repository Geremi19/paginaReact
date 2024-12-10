import React from 'react';
import { getAuth } from 'firebase/auth';
import '../styles/Menu.css';

const Menu = () => {
    const auth = getAuth();
    
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <header className="menu-header">
            <div className="menu-logo">My App</div>
            <nav className="menu-nav">
                <div className="menu-item" onClick={handleLogout}>Logout</div>
            </nav>
        </header>
    );
};

export default Menu;
