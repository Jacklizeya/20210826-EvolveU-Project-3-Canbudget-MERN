import React, { useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { scroller } from 'react-scroll';

import InfoSection from '../../InfoSection/InfoSection';
import Greeting from '../../InfoSection/Greeting';

import Promotions from '../../Promotions/Promotions';
import OurTeam from '../../OurTeam/OurTeam';
import { homeObjOne } from './Data';
import { promotionData } from '../../Promotions/data';
import { memberData } from '../../OurTeam/data';
import AuthenticationContext from '../../auth/AuthenticationContext';

const Home = () => {

    const location = useLocation();
    const isLogedIn = useContext(AuthenticationContext).isLogedIn();

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
            {isLogedIn ?
                (
                    <Greeting></Greeting>
                )
                :
                (
                    <InfoSection  {...homeObjOne} />
                )
            }
            < Promotions name='promotions' data={promotionData} />
            <OurTeam name='our-team' data={memberData} />
        </>
    )
};

export default Home;