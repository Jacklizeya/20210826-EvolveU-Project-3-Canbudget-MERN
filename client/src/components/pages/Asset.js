import React, {useState, useEffect} from 'react';
import axios from "axios"

function Asset() {
    const [users, setUsers] = useState([])   

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
        }
        getUsers()
    }, [])


 return (
    <>
        <h1> Asset </h1>
        {users? users.map(user => (

            user._id? 
            <div key={user.firstName + "Asset"}>
                {user.firstName}
                {user.lastName}
                {user.email}
                {user.address}
                {user.phoneNumber}


                
                    <table> 
                        <thead>
                            <tr key="itemname">
                                <th> item name </th>
                                <th> type </th>
                                <th> value </th>
                                <th> changeMonthToMonth </th>
                            </tr>
                        </thead>
                        <tbody>

                        {user.balanceSheet.map(
                            singleBalanceSheet => 

                            <tr key={singleBalanceSheet.name}>
                                <td> {singleBalanceSheet.name} </td>
                                <td> {singleBalanceSheet.type} </td>
                                <td> {singleBalanceSheet.value} </td>
                                <td> {singleBalanceSheet.changeMonthToMonth} </td>                   
                            </tr>
                            )} 

                        </tbody>                 
                    </table>    
                
                <br/>          
            </div> : ""
        )) : <div> No data yet </div>}
        
        </>
 )
}

export default Asset;