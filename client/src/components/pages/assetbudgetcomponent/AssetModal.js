import React from 'react'
import axios from "axios"
import styled from "styled-components"

// This is basically from W3 school, how to build a modal component
const OutSide = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`
const ModalContent = styled.div`

    
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 20%; /* Could be more or less, depending on screen size */

    p {
        margin-bottom: 1rem;
    }

    button {
        color: white;
        background: #01345B;
        font-size: 1em;
        padding: 0.5em 1.5em;
        border: 2px solid #01345B;
        border-radius: 3px;
        margin: 0.25em 0.5em;
    }
`
const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
`

// pass all the necessary function into child component
export function Modal({displayModal, setDisplayModal, itemname, userid, setDeleteStatus, setSortIndicator}) {

    // console.log(itemname, displayModal)

    async function deleteBalanceSheet(itemname, id) {
        let nameOfItemToRemove = itemname
        console.log(nameOfItemToRemove)
        let {data} = await axios.put(`/api/user/${id}/deletebalancesheet/`, {nameOfItemToRemove}, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setDeleteStatus(data.ok)
            setSortIndicator("")
        }}
    
    return (
        <div>
        
        {displayModal? 
        (<OutSide>
            
                <ModalContent>
                    <p> Are you sure you want to delete {itemname} ? </p>
                    <button onClick={event => {deleteBalanceSheet(itemname, userid); setDisplayModal(prev => !prev)}}> delete </button>
                    <Close onClick={event => {console.log("hello"); setDisplayModal(prev => !prev) }}>&times;</Close>
                </ModalContent>    
        </OutSide>) : null}
        </div>
        
    )
}
