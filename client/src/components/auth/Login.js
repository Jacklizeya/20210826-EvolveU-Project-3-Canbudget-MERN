import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from '@hookform/error-message';


import AuthenticationContext from "./AuthenticationContext"
//import Navbar from "../components/Navbar"

import { LoginFormDiv } from "./login.elements"

function Login({ successURL, cancelURL }) {
    const loginContext = useContext(AuthenticationContext);
    const history = useHistory();

    const { register, setError, clearErrors, formState: { errors }, handleSubmit } = useForm();
    let errorMessage = "";

    async function onSubmit(values) {
        errorMessage = await loginContext.logIn(values.email, values.password);
        if (errorMessage === "") {
            clearErrors();
            if (successURL !=="" ) {
                history.push(successURL);
            }
        } else {
            setError("password",
                { type: "server", message: errorMessage })
    
        }

        alert(errorMessage + "   logedin=" + loginContext.isLogedIn() + " admin=" + loginContext.isAdmin() + " uesrtype=" + loginContext.userType + "  id=" + loginContext.id);
    }

    function onCancel(){
        if (cancelURL !=="") {
            history.push(cancelURL);
        }
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
                            <button type="submit">Submit</button>
                            <button type="button" onClick={onCancel }>Cancel</button>
                    </div >
                </form>
            </LoginFormDiv>

        </div>
    );
}

export default Login;