import React, { useContext } from 'react';
import { animateScroll as scroll, scroller } from 'react-scroll';
// import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa'; icons commented out due to error
import {
    FooterContainer,
    //  FooterSubscription,
    //  FooterSubHeading, 
    //  FooterSubText, 
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    SocialIcon,
    WebsiteRights,    
    // SocialIcons,
    // SocialIconLink
} from './Footer.elements';
import AuthenticationContext from '../auth/AuthenticationContext';

const Footer = () => {

    const scrollTo = (targetEl) => {

    return () => {
        scroller.scrollTo(targetEl, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -80
        });
    };

    };

    const toggleHome = () => {
        scroll.scrollToTop();
    };
    const loginContext = useContext(AuthenticationContext);
    let showPrivate = loginContext.isUser();


    return (
        <FooterContainer>
            {/* <FooterSubscription>
                <FooterSubHeading>
                    Join us
                </FooterSubHeading>
                <FooterSubText>
                    I am not sure if we need this section
                </FooterSubText>
            </FooterSubscription> */}
            <FooterLinksContainer >
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>About us</FooterLinkTitle>
                        <FooterLink to='/#our-team' onClick={scrollTo('our-team')}>Our team</FooterLink>
                        <FooterLink to='/#promotions' onClick={scrollTo('promotions')}>Promotions</FooterLink>
                        <FooterLink to='/resources'>Resources</FooterLink>
                        {showPrivate &&
                            <>
                                <FooterLink to='/budget'>Budget</FooterLink>
                                <FooterLink to='/asset'>Asset</FooterLink>
                            </>
                        }
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Social Media</FooterLinkTitle>
                        <FooterLink to='/'>Facebook</FooterLink>
                        <FooterLink to='/'>Instagram</FooterLink>
                        <FooterLink to='/'>Youtube</FooterLink>
                        <FooterLink to='/'>Twitter</FooterLink>
                        <FooterLink to='/'>LinkedIn</FooterLink>
                    </FooterLinkItems>
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to='/' onClick={toggleHome}>
                        <SocialIcon />
                        CanBudget
                    </SocialLogo>
                    <WebsiteRights>CanBudget 2021</WebsiteRights>
                    {/* causing error as requires 'to' tag
                    <SocialIcons>
                        <SocialIconLink hret='/' target='_blank' aria-label='Facebook'>
                            <FaFacebook to='/' onClick={toggleHome} aria-label='Facebook' />
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Instagram'>
                            <FaInstagram to='/' onClick={toggleHome} aria-label='Instagram' />
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Youtube'>
                            <FaYoutube to='/' onClick={toggleHome} aria-label='Youtube' />
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Twitter'>
                            <FaTwitter to='/' onClick={toggleHome} aria-label='Twitter' />
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Linkedin'>
                            <FaLinkedin to='/' onClick={toggleHome} aria-label='Linkedin' />
                        </SocialIconLink>
                    </SocialIcons> */} 
                </SocialMediaWrap>
            </SocialMedia>
        </FooterContainer>

    )
};

export default Footer;
