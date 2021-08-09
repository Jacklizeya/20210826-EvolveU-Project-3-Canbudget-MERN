import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
import {SubmitButton, StockButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData, Numbertd} from "../components/AssetBudget/assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"
import {Modal} from "../components/AssetBudget/AssetModal"
import AuthenticationContext from '../components/auth/AuthenticationContext';
import Plaid from '../components/AssetBudget/AssetPlaid';

function Asset() {
    const {id} = useContext(AuthenticationContext)
    // console.log(id)

    // const [users, setUsers] = useState([])  
    const [user, setUser] = useState({})
    const [userBalanceSheet, setUserBalanceSheet] = useState([])

    const [name, setName] = useState("")
    const [type, setType] = useState("asset")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)

    const [addstatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    //  This is the control the sorting table   
    const [nameOpacity, setNameOpacity] = useState(0.5)
    const [typeOpacity, setTypeOpacity] = useState(0.5)
    const [valueOpacity, setValueOpacity] = useState(0.5)
    //  This is the sort Indication    
    const [sortIndicator, setSortIndicator] = useState("")
    const [sortDirectionName, setSortDirectionName] = useState(1)
    const [sortDirectionType, setSortDirectionType] = useState(1)
    const [sortDirectionValue, setSortDirectionValue] = useState(1)
 // This is for Modal
    const [nameToDelete, setNameToDelete] = useState("")
    const [displayModal, setDisplayModal] = useState(false)

    let history = useHistory()

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get(`/api/user/${id}`, )
            // console.log("*****", data)
            setUser(data)
        }
        getUsers()
        setAddStatus(0)
        setDeleteStatus(0)
    }, [addstatus, deleteStatus])

    useEffect(() => {
        if (user.balanceSheet){ 
            // console.log("**balance sheet", user.balanceSheet)
            setUserBalanceSheet(user.balanceSheet) } else {}
     }, [user])

    useEffect(()=>{
        if (sortIndicator === "name") {      setNameOpacity(1.0); setTypeOpacity(0.5); setValueOpacity(0.5); }
        else if (sortIndicator === "type") { setNameOpacity(0.5); setTypeOpacity(1.0); setValueOpacity(0.5); }
        else if (sortIndicator === "value") {setNameOpacity(0.5); setTypeOpacity(0.5); setValueOpacity(1.0); }
        else {setNameOpacity(0.5); setTypeOpacity(0.5); setValueOpacity(0.5);} 
    },
    [sortIndicator]
    ) 

    async function addNewBalanceSheet(event, id) {
        event.preventDefault()
        let newBalanceSheet = {name: name.toLowerCase(), type: type, value: Number(value), changeMonthToMonth: Number(changeMonthToMonth)}
        console.log("newBalanceSheet", newBalanceSheet)
        let {data} = await axios.put(`/api/user/${id}/addBalanceSheet/`, newBalanceSheet, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setType("asset")
            setValue(0)
            setChangeMonthToMonth(0)
            setAddStatus(data.ok)
            setSortIndicator("")
        }
    }

    function editItem(event) {
    let index = event.target.id
    // Right now I am using users[0], eventually it will be just one user, so need to fix this later
    let dataToEdit = user.balanceSheet[index]
    console.log(dataToEdit)
    setName(dataToEdit.name)
    setType(dataToEdit.type)
    setValue(dataToEdit.value)
    setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    }

    function sortArrayBy(event) {
        console.log("I want to sort by", event.target.id)
        setSortIndicator(event.target.id)
        let userCopy = {...user}
        userCopy.balanceSheet.sort(
            (a,b)=>{
                if (event.target.id === "name") { setSortDirectionName(sortDirectionName * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionName}
                else if (event.target.id === "type") { setSortDirectionType(sortDirectionType * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionType}
                else if (event.target.id === "value") {setSortDirectionValue(sortDirectionValue * -1); return (a[event.target.id]-b[event.target.id]) * sortDirectionValue} 
                }
            )
        console.log(userCopy)
        setUser(userCopy)
        console.log(user)
    }

// right now only hook up one, wait until login is done 
 return (
    <>
        <Heading1> Balance Sheet </Heading1>
        <Modal displayModal={displayModal} setDisplayModal={setDisplayModal} itemname={nameToDelete} userid={user._id} setDeleteStatus={setDeleteStatus} setSortIndicator={setSortIndicator}> </Modal>

            {user.email  ? 
            <div key={user.firstName + "Asset"}>
                <Descriptiondiv> 
                Name: {user.firstName} {user.lastName} <br/>
                Email: {user.email} <br/>
                Address: {user.address} <br/>
                Phonenumber: {user.phoneNumber} <br/> <br/>
                </Descriptiondiv>

                {userBalanceSheet? 
                    <Tablediv>
                    <table> 
                        <thead>
                            <tr key="itemname">
                                <th id="name" onClick={event => sortArrayBy(event)}> item name 
                                {sortDirectionName > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortDown> }</th>
                                <th id="type" onClick={event => sortArrayBy(event)} style={{width : "20%"}}> type 
                                {sortDirectionType > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortDown> }</th>
                                <th id="value" onClick={event => sortArrayBy(event)}> value 
                                {sortDirectionValue > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": valueOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": valueOpacity}}> </FaSortDown> }</th>
                                <th> changeMonthToMonth </th>
                                <th> edit </th>
                                <th> delete </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {userBalanceSheet.map(
                            (singleBalanceSheet, index) => 
                            <tr key={singleBalanceSheet.name}>
                                <td> {singleBalanceSheet.name.charAt(0).toUpperCase() + singleBalanceSheet.name.slice(1)} </td>
                                <td> {singleBalanceSheet.type} </td>
                                <Numbertd value={singleBalanceSheet.value}> {singleBalanceSheet.value} </Numbertd>
                                <td> {singleBalanceSheet.changeMonthToMonth} </td>    
                                <td> 
                                    <a href="#form">
                                        <button id={index} onClick={editItem} > 
                                            <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                        </button>
                                    </a>
                                </td> 
                                <td>
                                    <button onClick={()=>{setNameToDelete(singleBalanceSheet.name); setDisplayModal(prev => !prev)}}>
                                        <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                                    </button> 
                                </td>     
                            </tr>
                            )} 
                        </tbody>

                        <tfoot>
                            <tr key="itemname">
                                <TableBottomData> Sum </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData value = {Math.round(user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0) * 100) / 100}>  {Math.round(user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0) * 100) / 100} </TableBottomData>
                                
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                            </tr>
                        </tfoot>                 
                    </table> 
                </Tablediv>     
                    : null}
                  
                
                <br/> 

                <FormDiv>
                    <div className="form" id="form">
                       
                        <label> Add new item/Edit existing item  </label>
                        <form onSubmit={(event) => addNewBalanceSheet(event, user._id)}>
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
                            
                            <SubmitButton type="submit"> Submit </SubmitButton>
                            
                        </form>
                </div>         
                </FormDiv>
                <StockButton onClick={()=>{history.push('/stocks')}}>
                    Stocks
                </StockButton>
                <Plaid id={id} setAddStatus={setAddStatus}> </Plaid>
            </div> : ""
       }
        
        </>
 )
}

export default Asset;