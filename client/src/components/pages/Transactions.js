import React, {useState, useEffect, useContext} from 'react';
import axios from "axios"
import {SubmitButton, TransactionButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData, Numbertd, Tablefoot} from "./assetAndBudget.elements"

import AuthenticationContext from '../auth/AuthenticationContext';

export default function Transactions() {

    const {id} = useContext(AuthenticationContext)
    const [transactionData, setTransactionData] = useState([])

    useEffect(() => {
        async function getUserandSetTransactionData() {
            let {data} = await axios.get(`/api/user/${id}`, )
            console.log(data)
            // setUsers(data)
            setTransactionData(data.transaction)
            console.log("user", data.transaction)
        }
        console.log("enter use Effect")
        getUserandSetTransactionData()
    }, [])

    return (
        <div>
            
            {transactionData.length > 0 ? (
                <div>
                    <Descriptiondiv >
                            Historic transaction Data 
                    </Descriptiondiv>
                    <br/>   
                    <Tablediv> 
                        <table> 
                            <thead>
                                <tr>
                                    <th> 
                                        Date                                        
                                    </th>
                                    <th> 
                                        name 
                                    </th>
                                    <th >
                                         amount 
                                    </th>                                   
                                    <th> 
                                        bankname 
                                    </th>
                                    <th> 
                                        category 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {transactionData.map(
                                (transactionData) => 
                                <tr key={transactionData.name + transactionData.date}>
                                    <td> {transactionData.date} </td>
                                    <td> {transactionData.name} </td>
                                    <Numbertd value={transactionData.amount}> {transactionData.amount} </Numbertd>
                                    <td> {transactionData.bankname.charAt(0).toUpperCase() + transactionData.bankname.slice(1)} </td>
                                    <td> {transactionData.category} </td> 
                                </tr>
                                )} 
                            </tbody>    
                                    
                        </table>    
                    </Tablediv>
                </div>): <Descriptiondiv >
                            Loading ...
                        </Descriptiondiv>}
        </div>
    )
}
