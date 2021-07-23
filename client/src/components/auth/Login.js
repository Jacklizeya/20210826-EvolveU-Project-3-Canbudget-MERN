import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from '@hookform/error-message';
import axios from "axios"

import AuthenticationContext from "./AuthenticationContext"
import {SetMessage} from "../InfoSection/StatusLineMessage"
//import Navbar from "../components/Navbar"

import { LoginFormDiv, SubmitButton, SubmitCancelButtons } from "../pages/assetAndBudget.elements"

function Login({ successURL, cancelURL }) {
    const loginContext = useContext(AuthenticationContext);
    const history = useHistory();

    const { register, setError, clearErrors, formState: { errors }, handleSubmit,reset } = useForm();
    let errorMessage = "";

    async function onSubmit(values) {
        errorMessage = await loginContext.logIn(values.email, values.password, prepareMessage);
        if (errorMessage === "") {
            // // clearErrors();
            // // prepareMessageForStatusLine();

            // let who = 'brother';
            // alert("In prepare befgining")
    
            // const url = '/api/user/' + loginContext.id;
            // try {
            //     let { data } = await axios.get(url)
            //     who = data.firstName;
                    
            // } catch (error) {
                
            // }
            // const h = new Date().getHours();
            // let pd;
            // if (h < 4) {
            //     pd = 'night';
            // } else if (h < 12) {
            //     pd = 'morning';
            // } else if (h < 18) {
            //     pd = 'afternoon';
            // } else {
            //     pd = 'evening';
            // }
            // SetMessage("Good " + pd + " " + who); 
            // alert("prepareMessageForStatusLine finished")
            history.push("/dashboard");    
        } else {
            setError("password",
                { type: "server", message: errorMessage })
        }
        // alert(errorMessage + "   logedin=" + loginContext.isLogedIn() + " admin=" + loginContext.isAdmin() + " uesrtype=" + loginContext.userType + "  id=" + loginContext.id);
    }

    function onCancel() {
        clearErrors();
        history.push(cancelURL  ? cancelURL : "/");
        reset();
    }


    return (
        <div>
            <LoginFormDiv>
                <h1>Login</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container" >
                        <div>
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email"
                                placeholder="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email?.type === 'required' && <p>Email is required</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                {...register("password", { required: true })}
                            />
                            {/* {errors.password && <p>Password is required</p>} */}
                            {errors.password?.type === 'required' && <p>Password is required</p>}
                            {errors.password?.type === 'server' && <p>{errors.password.message}</p>}
                        </div>
                        <SubmitCancelButtons>
                            <SubmitButton type="submit"> Submit </SubmitButton>
                            <SubmitButton type="reset"  onClick={onCancel}> Cancel </SubmitButton>
                        </SubmitCancelButtons>
                    </div >
                </form>
            </LoginFormDiv>

        </div>
    );
}

async function prepareMessage(id){
    let who = 'brother';
    // alert("In prepare befgining")

    const url = '/api/user/' + id;
    try {
        let { data } = await axios.get(url)
        who = data.firstName;
            
    } catch (error) {
        
    }
    const h = new Date().getHours();
    let pd;
    if (h < 4) {
        pd = 'night';
    } else if (h < 12) {
        pd = 'morning';
    } else if (h < 18) {
        pd = 'afternoon';
    } else {
        pd = 'evening';
    }

    SetMessage("Good " + pd + " " + who);
    // alert("After set message")
}

export default Login;
export {
    prepareMessage
}

