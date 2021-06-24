import React from 'react';
import InfoSection from '../../InfoSection/InfoSection';
import Promotions from '../../Promotions/Promotions';
import { homeObjOne } from './Data';
import { promotionData } from '../../Promotions/data';

const Home = () => {
    return (
        <>
            <InfoSection  {...homeObjOne}/>
            <Promotions data={promotionData}/>
        </>
    )
};

export default Home;