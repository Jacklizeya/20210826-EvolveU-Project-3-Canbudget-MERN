import { useContext } from "react";

import EditClientComponent from "./EditClientComponent";
import AuthenticationContext from "./AuthenticationContext"

function SignUp() {
    const loginContext = useContext(AuthenticationContext);
    let userType, title
    if (loginContext.isAdmin()){
        userType = loginContext.userType;
        title = 'Create a new administrative account';
    }else{
        userType = 'general user';
        title = 'Create a new account'
    }
        
    
    return (
    <>
        <EditClientComponent
        id={null}
        userType ={userType}
        title ={title}
        message ="A new account created"
      />
    </>
 );



}

export default SignUp;