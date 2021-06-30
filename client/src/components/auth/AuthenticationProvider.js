import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [id, setId] = useState()
    let [userType, setUserType] = useState()

    const logIn = (email, password) => {
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
                if (!response.ok) { // error coming back from server
                    return "Server error";
                }

                let loggedInUser = await response.json();
                if (loggedInUser){
                    setId(loggedInUser._id);
                    setUserType(loggedInUser.userType);
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

    const logOut = async () => {
        if (isLogedIn()){
            try {
                let response = await fetch('/api/auth/logout');
            } catch (error) {               
            }

        }
        setId(null);
        setUserType("");
    }


    const isLogedIn = () =>{
        return id !==null; 
    }


    const isAdmin = () => {
        return isLogedIn && (userType==='admin');
    }

    let contextValue = {
        id, 
        userType,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
