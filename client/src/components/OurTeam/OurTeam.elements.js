import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MemberContainer = styled.div`
    /* height: 800px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #01345B;

    /* @media screen and (max-width: 1000px) {
        height: 2000px;
    }

    @media screen and (max-width: 768px) {
        height: 2000px;
    }

    @media screen and (max-width: 480px) {
        height: 2000px;
    } */
`;

export const MemberWrapper = styled.div`
    /* max-width: 1300px; */
    /* margin: 0 auto; */
    display: grid;
    width: 100%;
    grid-template-columns: 1.3fr 1.3fr 1.3fr 1.3fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

    @media screen and (max-width: 1480px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 40px;
        max-width: 950px;
    }

    @media screen and (max-width: 830px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
        grid-gap: 40px;
    }
`;

export const MemberCard = styled.div`
    background: rgba(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    /* position: relative;
    top: 15%; */
    border-radius: 10px;
    height: 500px;
    width: 365px;
    padding: 30px;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease-in-out;
    margin: 0 auto;

    @media screen and (min-width: 1480px) {
        height: 500px;
        width: 320px;
    }

    /* &:hover {
        transform: scale(1.03);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    } */
    
`;

export const MemberIconWrapper = styled.div`
    height: 200px;
    overflow-x: hidden;
`;

export const MemberIcon = styled.img`
    max-width: 200px;
    max-height: 180px;
`;

export const MemberH1 = styled.h1`
    font-size: 2rem;
    color: #fff;
    margin: 64px auto;

    @media screen and (max-width: 830px) {
        font-size: 2rem;
    }

`;

export const MemberH2 = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
    @media screen and (min-width: 1480px) {
        font-size: 1.7rem;
    }
`;

export const MemberP = styled.p`
    font-size: 1.2rem;
    text-align: justify;
`;

export const MemberSocialIcon = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    font-size: 2rem;
    color: #01345B;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1000px;
  margin: auto auto 0 auto;
`;