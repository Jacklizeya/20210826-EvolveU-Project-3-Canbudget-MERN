import React from 'react';

import Stocks from '../Stocks/Stocks';
// import Login from '../auth/Login';

function Advisors() {
    return (
        <div>
            <h1>Advisors</h1>
            {Stocks()}
            {/* <Login
                successURL=""
                cancelURL=""
            /> */}
        </div>
    )
}

export default Advisors;