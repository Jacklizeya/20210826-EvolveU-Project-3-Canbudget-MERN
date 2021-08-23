import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { animateScroll as scroll } from 'react-scroll';
import Dropdown from '../Dropdown/Dropdown';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink, NavDropDownLink } from './Navbar.elements';

import AuthenticationContext from '../auth/AuthenticationContext';

const Navbar = () => {

    const loginContext = useContext(AuthenticationContext);
    let showLogin = !loginContext.isLogedIn();
    let showSignUp = !loginContext.isLogedIn() || loginContext.isAdmin();
    let showPrivate = loginContext.isUser();
    let isAdmin = loginContext.isAdmin();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);


    const showButton = () => {
        if (window.innerWidth <= 960) {
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

    const toggleHome = () => {
        scroll.scrollToTop();
    };



    //dropdown
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      };
    
      const onMouseLeave = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(false);
        }
      };


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/' onClick={toggleHome}>
                            <NavIcon />
                            CanBudget
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MobileIcon>
                        <NavMenu onClick={handleClick} click={click}>
                                {!loginContext.id ? 
                                    <NavItem>
                                        <NavLinks to='' onClick={toggleHome} >
                                            Home
                                        </NavLinks>
                                    </NavItem> :
                                    <NavItem>
                                        <NavLinks to='/dashboard' onClick={toggleHome} >
                                            Dashboard
                                        </NavLinks>
                                    </NavItem>
                                }


                            {/* <NavItem>
                                <NavLinks to='/#promotions' onClick={scrollTo('promotions')}>
                                    Promotions
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/resources'>
                                    Resources
                                </NavLinks>
                            </NavItem> */}

                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/asset'>
                                        Asset
                                    </NavLinks>
                                </NavItem>
                            }
                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/budget'>
                                        Budget
                                    </NavLinks>
                                </NavItem>
                            }

                            {/* //Dropdown menu  */}
                             <NavItem 
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                <NavDropDownLink onClick={closeMobileMenu}>
                                    Information
                                    <i className='fas fa-caret-down' style={{marginLeft: 5}}/>
                                {dropdown && <Dropdown />}
                                </NavDropDownLink>
                            </NavItem> 

                            
                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/stocks'>
                                        Securities
                                    </NavLinks>
                                </NavItem>
                            }
                            
                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/transaction'>
                                        Transaction
                                    </NavLinks>
                                </NavItem>
                            }

                            {/* <NavItem>
                                <NavLinks to='/#our-team' onClick={scrollTo('our-team')}>
                                    Our Team
                                </NavLinks>
                            </NavItem> */}

                            {isAdmin &&
                                <NavItem>
                                    <NavLinks to='/settings'>
                                        Settings
                                    </NavLinks>
                                </NavItem>
                            }
                            {

                                //    showLogin &&
                                //     <NavItem>
                                //         <NavLinks to='/login'>
                                //             Login
                                //         </NavLinks>
                                //     </NavItem>
                                // 
                            }


                            {showLogin &&
                                <NavItem>
                                    <NavLinks to='/login'>
                                        Login
                                    </NavLinks>
                                </NavItem>
                            }
                            {!showLogin &&
                                <NavItem>
                                    <NavLinks to='/logout'>
                                        Logout
                                    </NavLinks>
                                </NavItem>
                            }
                            {showSignUp &&
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
                            }
                            {!showLogin &&
                                <NavItemBtn>
                                    {button ? (
                                        <NavBtnLink to='/modifyclient'>
                                            <Button primary>Account</Button>
                                        </NavBtnLink>
                                    ) : (
                                        <NavBtnLink to='/modifyclient'>
                                            <Button onClick={closeMobileMenu} fontBig primary>
                                                Personal information
                                            </Button>
                                        </NavBtnLink>
                                    )}
                                </NavItemBtn>
                            }



                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
};

export default Navbar;
















