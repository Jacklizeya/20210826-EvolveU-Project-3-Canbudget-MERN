import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink } from './Navbar.elements';


const Navbar = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'>
                            <NavIcon />
                            CanBudget
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MobileIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                <NavLinks to='/'>
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/promotions'>
                                    Promotions
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/advisors'>
                                    Advisors
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/budget'>
                                    Budget
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/asset'>
                                    Asset
                                </NavLinks>
                            </NavItem>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnLink to='/sign-up'>
                                        <Button primary>Sign Up</Button>
                                </NavBtnLink>
                                ) : (
                                    <NavBtnLink to='/sign-up'>
                                        <Button onClick={closeMobileMenu} fontBig primary>
                                            Sign Up
                                        </Button>
                                    </NavBtnLink>
                                )}
                            </NavItemBtn>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
};

export default Navbar;
















// import React, { useState } from 'react';
// import Button from './Button';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {

//     const [click, setClick] = useState(false);

//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);

//     return (
//         <>
//             <nav className='navbar'>
//                 <Link to='/' className='navbar-logo'>
//                     CanBudget <i className='fab fa-firstdraft'/>
//                 </Link>
//                 <div className='menu-icon' onClick={handleClick}>
//                     <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
//                 </div>
//                 <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                     <li className='nav-item'>
//                         <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//                             Home
//                         </Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link to='/promotions' className='nav-links' onClick={closeMobileMenu}>
//                             Promotions
//                         </Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link to='/advisors' className='nav-links' onClick={closeMobileMenu}>
//                             Advisors
//                         </Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link to='/budget' className='nav-links' onClick={closeMobileMenu}>
//                             Budget
//                         </Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link to='/asset' className='nav-links' onClick={closeMobileMenu}>
//                             Asset
//                         </Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
//                            Sign Up
//                         </Link>
//                     </li>
//                     <Button />
//                 </ul>
//             </nav>
//         </>
//     )
// };

// export default Navbar;