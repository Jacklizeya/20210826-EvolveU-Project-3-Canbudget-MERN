import React , { useEffect, useState, useCallback } from 'react'
import { PlaidButton, Descriptiondiv} from './assetAndBudget.elements'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from "axios"
import {SubmitButton, Tablediv, Heading1, FormDiv, TableBottomData, Numbertd, tdContainButton} from "./assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"

export default function Plaid({id, setAddStatus}) {

    const [linkToken, setLinkToken] = useState(null);
    const generateToken = async () => {
      const {data} = await axios.get('/api/plaid/create-link-token',)
      console.log(data)
      setLinkToken(data.linkToken);
    };
    useEffect(() => {
      generateToken();
    }, []);

    return (
        <div>
            <Descriptiondiv> Import Data from your financial Institution  directly </Descriptiondiv>
            {linkToken != null ? <Link linkToken={linkToken} id={id} setAddStatus={setAddStatus}/> : <div></div>}
        </div>
    )
}

  const Link = ({linkToken, id, setAddStatus}) => {


    const [assetFromPlaid, setAssetFromPlaid] = useState([])
    const [name, setName] = useState("")
    const [type, setType] = useState("asset")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    //  which one is going to be updated?
    const [editLocation, setEditLocation] = useState()
    const [accessToken, setAccessToken] = useState("")

    const onSuccess = useCallback(async (public_token, metadata) => {
      // send public_token to server
      
      const {data} = await axios.post('/api/plaid/token-exchange', {public_token}, {headers : {"Content-Type": "application/json"}})
      
      console.log("data", data)
      setAssetFromPlaid(data.balanceSheet)
      setAccessToken(data.accessToken)
      // Handle response ...

    }, []);
    const config = {
      token: linkToken,
      onSuccess,
    };
    const { open, ready } = usePlaidLink(config);


    async function addPlaid(id) {
      let success = true
      assetFromPlaid.forEach(async (element) => {
        const {name, type, value, changeMonthToMonth} = element;
        let newPlaid = {name: name.toLowerCase(), type, value: Number(value), changeMonthToMonth : Number(changeMonthToMonth)}
        let {data} = await axios.put(`/api/user/${id}/addBalanceSheet/`, newPlaid, {headers : {"Content-Type": "application/json"}})
        if (!data.ok) {success = false;}  
      })
      
      if (success) {
          setAddStatus(1)
          setAssetFromPlaid([])
      } else {throw new Error("Unable to add Bank Data to database")}
  }

    function editPlaidItem(event) {
      let index = event.target.id
      // Right now I am using users[0], eventually it will be just one user, so need to fix this later
      let dataToEdit = assetFromPlaid[index]
      console.log(dataToEdit)
      setEditLocation(index)
      setName(dataToEdit.name)
      setType(dataToEdit.type)
      setValue(dataToEdit.value)
      setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    }

    function confirmEdit(event) {
    event.preventDefault()
    let newPlaidItem = {name: name.toLowerCase(), type: type, value: Number(value), changeMonthToMonth: Number(changeMonthToMonth)}
    console.log("newPlaidItem", newPlaidItem)
    let newAssetFromPlaid = [...assetFromPlaid]
    newAssetFromPlaid.splice(editLocation, 1, newPlaidItem)
    // synchronous update
    setAssetFromPlaid(newAssetFromPlaid)
    // reset everything here
    setName("")
    setType("asset")
    setValue(0)
    setChangeMonthToMonth(0)
    setEditLocation(null)
    }

    function deletePlaidItem(event) {
      let index = event.target.id
      let newAssetFromPlaid = [...assetFromPlaid]
      newAssetFromPlaid.splice(index, 1)
      setAssetFromPlaid(newAssetFromPlaid)
    }

    async function getTransactionData(accessToken) {
      console.log(accessToken)
      const {data} = await axios.post('/api/plaid/transaction', {accessToken}, {headers : {"Content-Type": "application/json"}})
      console.log(data.TransactionResponse)
      console.log(data.TransactionResponse.transactions)
    }

    return (
      <div> 
        <PlaidButton onClick={() => {setAssetFromPlaid([]); open()}} disabled={!ready}>
        Import info from your financial institution
        </PlaidButton>

        <button onClick={(event)=>{getTransactionData(accessToken)}}> Transaction data </button>  

        {assetFromPlaid.length? 
            <div>
            <Tablediv>
            
            <table> 
                <thead>
                    <tr key="itemname">
                        <th id="name" > item name </th>
                        <th id="type" style={{width : "20%"}}> type </th>
                        <th id="value" > value </th>
                        <th> changeMonthToMonth </th>
                        <th> edit </th>
                        <th> delete </th>
                    </tr>
                </thead>
                
                <tbody>
                {assetFromPlaid.map(
                    (assetFromPlaid, index) => 
                    <tr key={assetFromPlaid.name}>
                        <td> {assetFromPlaid.name.charAt(0).toUpperCase() + assetFromPlaid.name.slice(1)} </td>
                        <td> {assetFromPlaid.type} </td>
                        <Numbertd value={assetFromPlaid.value}> {assetFromPlaid.value} </Numbertd>
                        <td> {assetFromPlaid.changeMonthToMonth} </td>    
                        <td> 
                            <a href="#plaidform">
                                <button id={index} onClick={editPlaidItem}> 
                                    <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                </button>
                            </a>
                        </td> 
                        <td>
                            <button id={index} onClick={deletePlaidItem}>
                                <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                            </button> 
                        </td>     
                    </tr>
                    )} 
                </tbody>           
            </table> 
            <br/>
            <SubmitButton onClick={(event) => addPlaid(id)}> Reviewed and accept all the data from {assetFromPlaid[0].name.split(" ")[0].toUpperCase()} </SubmitButton>
        </Tablediv> 
        
        <FormDiv>
        <div className="form" id="plaidform">
            <label> Edit items from Plaid  </label>
            <form onSubmit={confirmEdit}>
                <label> Name of the item </label>
                <input type="text" required value={name} onChange={(event)=>{setName(event.target.value)} }/> <br/>
                <label> Type </label>
                <select value={type} required onChange={(event)=>{setType(event.target.value)}}>
                    <option value="asset"> asset </option>
                    <option value="liability"> liability </option>
                    </select>   <br/>
                <label> value </label>
                <input type="text" required value={value} onChange={(event)=>{(setValue(event.target.value))}}/> <br/>
                <label> changeMonthToMonth </label>
                <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                <SubmitButton type="submit"> Change {name} </SubmitButton>
            </form>
    </div>         
    </FormDiv>
        </div>    
        
            : null}
      </div>

    );
  };
