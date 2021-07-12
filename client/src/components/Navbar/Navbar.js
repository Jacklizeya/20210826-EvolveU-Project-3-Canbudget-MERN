import React, { useState, useEffect,useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { animateScroll as scroll, scroller } from 'react-scroll';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink } from './Navbar.elements';
import AuthenticationContext from '../auth/AuthenticationContext';


const Navbar = () => {
    const loginContext = useContext(AuthenticationContext);
    let showLogin = !loginContext.isLogedIn();
    let showSignUp = !loginContext.isLogedIn() || loginContext.isAdmin();
    let showPrivate = loginContext.isUser();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


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

    const scrollTo = (targetEl) => {

        return () => {

            scroller.scrollTo(targetEl, {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
                offset: -80
            });
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
                            <NavItem>
                                <NavLinks to='' onClick={toggleHome} >
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/#promotions' onClick={scrollTo('promotions')}>
                                    Promotions
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/advisors'>
                                    Advisors
                                </NavLinks>
                            </NavItem>
                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/budget'>
                                        Budget
                                    </NavLinks>
                                </NavItem>
                            }
                            {showPrivate &&
                                <NavItem>
                                    <NavLinks to='/asset'>
                                        Asset
                                    </NavLinks>
                                </NavItem>
                            }
                            <NavItem>
                                <NavLinks to='/#our-team' onClick={scrollTo('our-team')}>
                                    Our Team
                                </NavLinks>
                            </NavItem>
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
                                            <Button primary>Personal information</Button>
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
















