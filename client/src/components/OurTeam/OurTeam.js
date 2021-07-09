import React from 'react';
import {
    MemberContainer,
    MemberH1,
    MemberWrapper,
    MemberCard,
    MemberIconWrapper,
    MemberIcon,
    MemberH2,
    MemberP,
    MemberSocialIcon,
    SocialMediaWrap
} from './OurTeam.elements';

import {  FaLinkedin, FaGithub } from 'react-icons/fa';
import { Element } from 'react-scroll';

const OurTeam = ({name, data}) => {
        return(
            <Element name={name}>
                <MemberContainer >
                    <MemberH1>Our Team</MemberH1>
                    <MemberWrapper>
                        {data.map((member, index) => {
                            return (
                            <MemberCard key={index}>
                                <MemberIconWrapper>
                                    <MemberIcon src={member.img} alt={member.alt}></MemberIcon>
                                </MemberIconWrapper>
                               
                                <MemberH2>{member.name}</MemberH2>
                                <MemberP>{member.desc}</MemberP>
                                <SocialMediaWrap>
                                    <MemberSocialIcon to={{ pathname: member.linkedin }} target="_blank" >
                                    
                                        <FaLinkedin />
                                    </MemberSocialIcon>
                                    <MemberSocialIcon to={{ pathname: member.github }} target="_blank"  >
                                        <FaGithub />
                                    </MemberSocialIcon>
                                    
                                </SocialMediaWrap>
                                
                            </MemberCard>
                        )})
                    }    
                    </MemberWrapper>
                </MemberContainer>
            </Element>
        )
};

export default OurTeam;
