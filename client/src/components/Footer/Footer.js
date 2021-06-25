import React, { useEffect } from 'react';
import {useLocation} from "react-router-dom";
import {scroller} from 'react-scroll';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FooterContainer,
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
         SocialIcons,
         SocialIcon,
         WebsiteRights,
         SocialIconLink
         } from './Footer.elements';

const Footer = () => {

    const location = useLocation();

    const scrollTo = (targetEl) => {

            scroller.scrollTo(targetEl, {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
                offset: -780
            });
        
    };

    useEffect(() => {

        let hash = location.hash.replace('#', '')
        
        debugger;
        if (hash.length) {
            scrollTo(hash);
        }
        
    }, [])
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
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/#promotions' onClick={scrollTo('promotions')} smooth={true} duration={500} spy={true} exact='true' offset={-80}>Promotions</FooterLink>
                        <FooterLink to='/advisors'>Advisors</FooterLink>
                        <FooterLink to='/budget'>Budget</FooterLink>
                        <FooterLink to='/asset'>Asset</FooterLink>
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
                <FooterLinksWrapper>    
                    {/* <FooterLinkItems>
                        <FooterLinkTitle>Social Media</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/promotions'>Promotions</FooterLink>
                        <FooterLink to='/advisors'>Advisors</FooterLink>
                        <FooterLink to='/budget'>Budget</FooterLink>
                        <FooterLink to='/asset'>Asset</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Social Media</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/promotions'>Promotions</FooterLink>
                        <FooterLink to='/advisors'>Advisors</FooterLink>
                        <FooterLink to='/budget'>Budget</FooterLink>
                        <FooterLink to='/asset'>Asset</FooterLink>
                    </FooterLinkItems> */}
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to ='/'>
                        <SocialIcon />
                        CanBudget
                    </SocialLogo>
                    <WebsiteRights>CanBudget 2021</WebsiteRights> 
                    <SocialIcons>
                        <SocialIconLink hret='/' target='_blank' aria-label='Facebook'>
                            <FaFacebook hret='/' target='_blank' aria-label='Facebook'/>
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Instagram'>
                            <FaInstagram hret='/' target='_blank' aria-label='Instagram'/>
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Youtube'>
                            <FaYoutube hret='/' target='_blank' aria-label='Youtube'/>
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Twitter'>
                            <FaTwitter hret='/' target='_blank' aria-label='Twitter'/>
                        </SocialIconLink>
                        <SocialIconLink hret='/' target='_blank' aria-label='Linkedin'>
                            <FaLinkedin hret='/' target='_blank' aria-label='Linkedin'/>
                        </SocialIconLink>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterContainer>

    )
};

export default Footer;
