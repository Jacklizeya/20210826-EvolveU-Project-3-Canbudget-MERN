import React, { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    CanBudget <i className='fab fa-firstdraft'/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/promotions' className='nav-links' onClick={closeMobileMenu}>
                            Promotions
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/advisors' className='nav-links' onClick={closeMobileMenu}>
                            Advisors
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/budget' className='nav-links' onClick={closeMobileMenu}>
                            Budget
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/asset' className='nav-links' onClick={closeMobileMenu}>
                            Asset
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                           Sign Up
                        </Link>
                    </li>
                    <Button />
                </ul>
            </nav>
        </>
    )
};

export default Navbar;