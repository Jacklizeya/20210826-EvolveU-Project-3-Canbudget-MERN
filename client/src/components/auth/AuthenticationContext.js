import React from 'react'

const AuthenticationContext = React.createContext({
    id: null,
    userType: "",

    isLogedIn: () => {},
    isAdmin: ()=> {},
    logIn: (username, isAgent) => {},
    logOut: () => {}

})

export default AuthenticationContext
