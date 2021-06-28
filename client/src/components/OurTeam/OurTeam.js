import React from 'react';
import {
    MemberContainer,
    MemberH1,
    MemberWrapper,
    MemberCard,
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
                                <MemberIcon src={member.img} alt={member.alt}></MemberIcon>
                                <MemberH2>{member.name}</MemberH2>
                                <MemberP>{member.desc}</MemberP>
                                <SocialMediaWrap>
                                    <MemberSocialIcon>
                                        <FaLinkedin href={member.linkedin}  />
                                        <FaGithub href={member.github} />
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
