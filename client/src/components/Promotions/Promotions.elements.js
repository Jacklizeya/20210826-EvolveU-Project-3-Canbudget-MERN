import styled from 'styled-components';
// import img from '../../images/invest.svg';

export const PromotionWrapper = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-space-around;
    background: #fff;
    padding: 50px; 

    @media screen and (max-width: 1480px) {
        flex-wrap: wrap;
    }
`;

export const PromotionCard= styled.div`
    margin: 20px auto;
    width: 450px;
    /* height: 600px; */
    /* overflow: scroll; */
    border: 2px solid #4bcbcc;
    padding: 50px;
    /* display: flex; */
    background-color: rgba(255, 255, 255, 0.7);
    align-items: center;
    position: relative; 
    top: 50%;
    /* -ms-transform: translateY(-50%); */
    /* transform: translateY(-50%); */
    box-shadow: 10px 10px 10px #01345B;
    border-radius: 15px;

    &:hover {
        transform: scale(1.035);
        transition: all 0.3s ease-out;
    }

    /* @media screen and (max-width: 1480px) {
        margin: 20px;
    } */


`;

export const PromotionImg = styled.div`
    max-width: 555px;
    display: flex;
    
`;

export const Img = styled.img`
    /* border: 1px solid ; */
    width: 100%;
    height: 300px; 
    
`;

export const PromotionTitle = styled.h2`
    padding: 15px;
    color: #01345B;
    font-size: 26px;
    text-align: center;
`;

export const PromotionText = styled.p`
    color: #01345B;
    font-size: 18px;
    padding-top: 25px;
    text-align: left;
`;