import React, { useEffect } from 'react';
import {useLocation} from "react-router-dom";
import {scroller} from 'react-scroll';

import InfoSection from '../../InfoSection/InfoSection';
import Promotions from '../../Promotions/Promotions';
import { homeObjOne } from './Data';
import { promotionData } from '../../Promotions/data';



const Home = () => {

    const location = useLocation();

    const scrollTo = (targetEl) => {

            scroller.scrollTo(targetEl, {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
                offset: -80
            });
        
    };

    useEffect(() => {
        let hash = location.hash.replace('#', '')
        
        if (hash.length) {
            scrollTo(hash);
        }
        
    }, [])

    return (
        <>
            <InfoSection  {...homeObjOne}/>
            <Promotions name='promotions' data={promotionData}/>
        </>
    )
};

export default Home;