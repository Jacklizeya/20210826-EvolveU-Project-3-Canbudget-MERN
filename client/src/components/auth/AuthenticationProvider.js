import { useEffect, useState } from 'react'
import axios from "axios"

import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [id, setId] = useState(null);
    let [userType, setUserType] = useState("");
    const [loading, setLoading] = useState(true);


    const reestablishConnection = async () => {
        if (!isLogedIn()) {
            // let { data } = await axios.get('/api/auth/loggedInUser')
            try {
                let response = await fetch('/api/auth/loggedInUser');
                if (response && response.ok) {
                    const data = await response.json();
                    if (data._id && data.userType) {
                        setUserAgain(data._id, data.userType);
                    }
                }
            } catch (error) {
        }
        // if (data._id && data.userType) {
        //     setUserAgain(data._id, data.userType);
        // }
    }
    setLoading(false);
}

const logIn = (email, password, messageFunction) => {
    async function logintoserver() {
        let loginOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
        try {
            let response = await fetch('/api/auth/login', loginOptions);
            if (response.status === 401) {
                return "Wrong email or password";
            }
            if (!response.ok) { // error coming back from server
                return "Server error";
            }

            let loggedInUser = await response.json();
            if (loggedInUser) {
                await messageFunction(loggedInUser._id);
                setId(loggedInUser._id);
                setUserType(loggedInUser.userType);
                contextValue.id = loggedInUser._id;
                contextValue.userType = loggedInUser.userType;
                return "";
            }
            return "Server error 2";
            //console.log('The call the auth returned: ', loggedInUser);

        } catch (error) {
            return error.message;
        }
    }
    return logintoserver();
}

useEffect(() => { reestablishConnection() }, []);

const logOut = async () => {
    if (isLogedIn()) {
        try {
            let response = await fetch('/api/auth/logout');
        } catch (error) {
        }

    }
    setId(null);
    setUserType("");
}


const isLogedIn = () => {
    return contextValue.id !== null;
}


const isAdmin = () => {
    return isLogedIn && (userType === 'administrator');
}


const isUser = () => {
    return isLogedIn && (userType === 'general user');
}

const setUserAgain = (id, userType) => {
    setId(id);
    setUserType(userType);
    contextValue.id = id;
    contextValue.userType = userType;
}

let contextValue = {
    id,
    userType,
    isLogedIn,
    isAdmin,
    isUser,
    logIn,
    logOut,
    setUserAgain
}

return (
    <AuthenticationContext.Provider value={contextValue}>
        {
            loading ?
                (<div>loading...</div>)
                :
                (children)
        }
    </AuthenticationContext.Provider>
)
}

export default AuthenticationProvider
