import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MemberContainer = styled.div`
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #01345B;

    @media screen and (max-width: 768px) {
        height: 1400px;
    }

    @media screen and (max-width: 480px) {
        height: 1300px;
    }
`;

export const MemberWrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.3fr 1.3fr 1.3fr 1.3fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`;

export const MemberCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 640px;
    min-height: 500px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 768px) {
        min-height: 300px;
    }

    /* &:hover {
        transform: scale(1.03);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    } */
`;

export const MemberIcon = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
`;

export const MemberH1 = styled.h1`
    font-size: 2rem;
    color: #fff;
    margin-bottom: 64px;

    @media screen and (max-width: 768px) {
        font-size: 2rem;
        margin-top: 100px;
    }
`;

export const MemberH2 = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
`;

export const MemberP = styled.p`
    font-size: 1.5rem;
    text-align: center;
`;

export const MemberSocialIcon = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
    font-size: 2rem;
    color: #01345B;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  max-width: 1000px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;