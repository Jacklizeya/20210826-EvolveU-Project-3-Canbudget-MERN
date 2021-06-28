import React from 'react';

import {
    PromotionWrapper,
    PromotionCard,
    PromotionImg,
    Img,
    PromotionTitle,
    PromotionText
} from './Promotions.elements';

import { Element } from 'react-scroll';

const Promotions = ({name, data}) => {
    return (
        <Element name={name}>
        <PromotionWrapper>
            {data.map((promotion, index) => {
                return (
                    <PromotionCard key={index}>
                        <PromotionImg>
                            <Img src={promotion.img} alt={promotion.alt}></Img>
                        </PromotionImg>
                        <PromotionTitle>{promotion.title}
                            <PromotionText>{promotion.desc}</PromotionText>
                        </PromotionTitle>
                    </PromotionCard>
                )})
            }    
        </PromotionWrapper>
        </Element>
    )
};

export default Promotions;
