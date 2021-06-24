import React from 'react';
import InfoSection from '../../InfoSection/InfoSection';
import Promotions from '../../Promotions/Promotions';
import { homeObjOne } from './Data';

const Home = () => {
    return (
        <>
            <InfoSection  {...homeObjOne}/>
            <Promotions />
        </>
    )
};

export default Home;