import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext"
import EditClientComponent from "./EditClientComponent";

const ModifyClientPage = () => {
  const loginContext = useContext(AuthenticationContext);
  

  return (
    <>
      <EditClientComponent
        id={loginContext.id}
        userType ={loginContext.userType }
        title ={"Modify personal information"}
        message ="Personal information modified"
      />
    </>
  );
}

export default ModifyClientPage;