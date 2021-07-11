import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthenticationContext from "./AuthenticationContext"

function Logout({ logoutURL }) {
    const history = useHistory();
    const loginContext = useContext(AuthenticationContext);
    loginContext.logOut();
    history.push(logoutURL !== "" ? logoutURL : "/");
    return null;
}
export default Logout;