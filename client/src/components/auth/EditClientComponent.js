import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"

import {SetMessage} from "../InfoSection/StatusLineMessage"
import { LoginFormDiv, SubmitButton, SubmitCancelButtons } from "../AssetBudget/assetAndBudget.elements"

const EditClientComponent = ({ id, userType, title, message }) => {
    const [loadeed, setLoadeed] = useState(false);
    const history = useHistory();
    // alert("~userType="+  userType)

    useEffect(() => {
        async function LoadData() {
            if (id) {
                try {
                    let { data } = await axios.get(`/api/user/${id}`)
                    // console.log(data)
                    setValue("firstName", data.firstName);
                    setValue("lastName", data.lastName);
                    setValue("email", data.email);
                    setValue("password", data.password);
                    setValue("phoneNumber", data.phoneNumber);
                    setValue("address", data.address);
                } catch (error) {
                    serverError(error)
                }
            }
            setLoadeed(true);
        }
        LoadData()
    }, [])


    const { register, setError, clearErrors, setValue, formState: { errors }, handleSubmit, reset }
        = useForm();

    const onSubmit = async (values) => {
        let user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
            address: values.address,
            userType
        };
        let response;
        try {
            if (id) {
                user._id = id;
                response = await axios.patch('/api/user/', user, { headers: { "Content-Type": "application/json" } });
            } else {
                response = await axios.post('/api/user',   user, { headers: { "Content-Type": "application/json" } });
                // console.log("response.status=", response.status,"response.statusText=", response.statusText)
            }
            SetMessage(message);
            history.push("/onboard");
        } catch (error) {
            serverError(error)
        }
    }


    function serverError(error) {
        let err = (error.response) ?
            error.response.status + " " + error.response.data :
            error;
        setError("address",
            { type: "server", message: err });
    }



    function onCancel() {
        clearErrors();
        history.push("/");
    }

    // const moreDetail = watch('moreDetail');

    return (
    (loadeed) ?
        (
            <LoginFormDiv>
                <h1>{title}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input placeholder="first name" {...register('firstName', { required: true })} />
                        {errors.firstName && <p>First name is required</p>}
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input placeholder="last name" {...register('lastName', { required: true })} />
                        {errors.lastName && <p>Last name is required</p>}
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="email"
                            type="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p>Please enter a correct email</p>}

                    </div>


                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            {...register('password',
                                {
                                    required: "Password required",
                                    minLength: { value: 4, message: "Password length should be 4 or more" }
                                })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <input placeholder="phone number" {...register('phoneNumber')} />
                    </div>

                    <div>
                        <label htmlFor="address">Address:</label>
                        <input {...register('address')} />
                    </div>

                    <SubmitCancelButtons>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton type="reset" onClick={onCancel}>Cancel</SubmitButton>
                    </SubmitCancelButtons>

                    {errors.address?.type === 'server' && <p>{errors.address.message}</p>}

                </form>
            </LoginFormDiv>
        )
        :
        (
            <div>loading...</div>
        )
    )
}

export default EditClientComponent
