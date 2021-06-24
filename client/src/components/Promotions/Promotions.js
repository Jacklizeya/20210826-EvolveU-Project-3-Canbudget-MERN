import React from 'react';
import { promotionData } from './data';

import {
    PromotionWrapper,
    PromotionCard,
    PromotionImg,
    Img,
    PromotionTitle,
    PromotionText
} from './Promotions.elements';

const Promotions = ({data}) => {
    return (
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
    )
};

export default Promotions;
