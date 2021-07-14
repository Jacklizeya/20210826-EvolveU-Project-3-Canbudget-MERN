import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"

import {Centeredh3} from "../pages/assetAndBudget.elements"
import AuthenticationContext from '../auth/AuthenticationContext';

const Greeting = () => {

    const [gString, setGString] = useState("");
    const id = useContext(AuthenticationContext).id;
    const newSID = sumLetters(id.toString());
    const [sid, setSID] = useLocalStorage("sid", 0);

    useEffect(() => {
        async function GetGreetingStreeng() {
            // alert("id =" + id+"  sid=" +sid+ "   newSID="+newSID)
            if (sid === newSID) {
            }
            else {
                setSID(newSID);
                let who = 'brother';
                const url = '/api/user/' + id;
                let { data } = await axios.get(url,)
                who = data.firstName;
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

                setGString("Good " + pd + " " + who);
            }
        }
        GetGreetingStreeng();
    }, []);


    return (
        (gString === "") ?
            (null
            )
            :
            (
                <Centeredh3>{gString} </Centeredh3>
            )
    )
}

const sumLetters = str => {
    let sum = 0;
    // for (let char of str) {
    //     sum += char;
    //     alert("sum= "+sum + "  char="+char)
    // }
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum
};

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}


export default Greeting;