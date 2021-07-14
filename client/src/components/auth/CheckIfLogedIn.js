import { useContext } from 'react';
import axios from "axios"

import AuthenticationContext from './AuthenticationContext';

async function CheckIfLogedIn() {
    const loginContest = useContext(AuthenticationContext);
    if (!loginContest.isLogedIn()) {
        let { data } = await axios.get('/api/auth/loggedInUser')
        if (data._id && data.userType) {
            loginContest.setUserAgain(data._id, data.userType);
        }
    }
}
export default CheckIfLogedIn;