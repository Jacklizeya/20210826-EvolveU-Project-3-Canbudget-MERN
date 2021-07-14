import React from 'react'

const AuthenticationContext = React.createContext({
    id: null,
    userType: "",

    isLogedIn: () => {},
    isAdmin: ()=> {},
    isUser: () =>{},
    logIn: (username, isAgent) => {},
    logOut: () => {},
    setUserAgain: (id, t) =>{}
})

export default AuthenticationContext
