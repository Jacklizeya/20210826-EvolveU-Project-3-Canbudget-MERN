import React, { useState, useEffect } from 'react';

import {Centeredh3} from "../AssetBudget/assetAndBudget.elements"

const key = "statusMessage";
function SetMessage(message) {
    SaveInStorage(key, "~" + message);
    // alert("setmessage " + message) 
}

function RestoreMessage() {
    let message = RestoreFromStorage(key, "");
    // alert("restoremessage " + message) 

    // console.log("message1="+message)
    if (message && message.startsWith("~")) {
        message = message.substring(1);
        // console.log("message2="+message)

        SaveInStorage(key, message);
        return message;
    }
    return "";
}


function RestoreFromStorage(key, initialValue) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.log(error);
        return initialValue;
    }
}

function SaveInStorage(key, value) {
    try {
        const valueToStore =
            value instanceof Function ? value(value) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
        console.log(error);
    }
};

const Greeting = () => {

    const [gString, setGString] = useState("");

    useEffect(() => {
        // RestoreMessage()
        // alert("Greeting useeffect")
        setGString(RestoreMessage());

    },[]);


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

// const sumLetters = str => {
//     let sum = 0;
//     for (let i = 0; i < str.length; i++) {
//         sum += str.charCodeAt(i);
//     }
//     return sum
// };


// const [sid, setSID] = useLocalStorage("sid", 0);
// setSID(newSID);

// function useLocalStorage(key, initialValue) {
//     const [storedValue, setStoredValue] = useState(() => {
//         try {
//             const item = window.localStorage.getItem(key);
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             console.log(error);
//             return initialValue;
//         }
//     });
//     const setValue = (value) => {
//         try {
//             const valueToStore =
//                 value instanceof Function ? value(storedValue) : value;
//             setStoredValue(valueToStore);
//             window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return [storedValue, setValue];
// }



export default Greeting;
export {
    SetMessage,
    RestoreMessage,
    RestoreFromStorage,
    SaveInStorage
}