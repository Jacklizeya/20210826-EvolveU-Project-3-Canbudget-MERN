import React , { useEffect, useState, useCallback } from 'react'
import { PlaidButton, SubmitButton, Tablediv, Numbertd} from './assetAndBudget.elements'
import { usePlaidLink } from 'react-plaid-link';
import axios from "axios"



//  This is for socket io
import io from "socket.io-client"
// io === connect (connect to the server)
const targetURL = process.env.NODE_ENV === "production" ? window.location.hostname : "http://localhost:3000"
const socket = io(targetURL, {
  extraHeaders: {
    'plaid-transaction': 'CanBudget'
  }
})

export default function Plaid({id, setAddStatus}) {

    const [linkToken, setLinkToken] = useState(null);
    const [plaidStatusReady, setPlaidStatusReady] = useState("")

    const generateToken = async () => {
      const {data} = await axios.get('/api/plaid/create-link-token',)
      // console.log(data)
      setLinkToken(data.linkToken);
    };
    useEffect(() => {

        socket.on("connect_error", (err) => {
          console.log(`connect_error due to ${err.message}`, err);})

        socket.on("connect", () => {
        console.log("socket here")
        // either with send()
        socket.send("Hello!");
      
        // or with emit() and custom event names
        socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
      });
      
      // handle the event sent with socket.send()
      socket.on("message", data => {
        console.log("message event", data);                  
        if (data === "INITIAL_UPDATE") {setPlaidStatusReady("INITIAL_UPDATE")}
        else if (data === "HISTORICAL_UPDATE") {setPlaidStatusReady("HISTORICAL_UPDATE")}
      });
      
      // handle the event sent with socket.emit()
      socket.on("greetings", (elem1, elem2, elem3) => {
        console.log(elem1, elem2, elem3);
      });
      generateToken();
      // console.log("socketstatus", socket.connected)
    }, []);

    return (
            linkToken !== null ? 
              <Link linkToken={linkToken} id={id} setAddStatus={setAddStatus} plaidStatusReady={plaidStatusReady} setPlaidStatusReady={setPlaidStatusReady}/> 
              : null
    )
}

  const Link = ({linkToken, id, setAddStatus, plaidStatusReady, setPlaidStatusReady}) => {
  
    // const [accessToken, setAccessToken] = useState("")
    const [transactionData, setTransactionData] = useState([])

    const onSuccess = useCallback(async (public_token, metadata) => {
      // send public_token to server
      
      const {data} = await axios.post('/api/plaid/token-exchange', {public_token}, {headers : {"Content-Type": "application/json"}})
      
      console.log("data", data)

    }, []);
    const config = {
      token: linkToken,
      onSuccess,
    };
    const { open, ready } = usePlaidLink(config);


    async function addTransactionFromPlaidDatabase(id) {
      let success = true
      // transactionData.forEach(async (element) => {
      //   const {date, name, amount, bankname, category} = element;
      //   let {data} = await axios.put(`/api/user/${id}/addtransaction`, element, {headers : {"Content-Type": "application/json"}})
      //   if (!data.ok) {success = false;}  
      // })
      let {data} = await axios.put(`/api/user/${id}/addtransaction`, transactionData, {headers : {"Content-Type": "application/json"}})
      if (!data.ok) {success = false;} 

      if (success) {
          setTransactionData([])
          setPlaidStatusReady("")
          setAddStatus(1)
      } else {throw new Error("Unable to add Bank Data to database")}
  }

     async function getTransactionData() {
      
      const {data} = await axios.post('/api/plaid/transaction', {}, {headers : {"Content-Type": "application/json"}})
      // console.log(data)
      // console.log(data)
      setTransactionData(data)
    }

    return (
      <div> 
        <PlaidButton onClick={() => {setTransactionData([]); setPlaidStatusReady(""); open()}} disabled={!ready}>
        Import transactions from your financial institution
        </PlaidButton>

        {plaidStatusReady? (plaidStatusReady === "INITIAL_UPDATE"? 
        <SubmitButton> Preparing your transaction data ... </SubmitButton>  
        :
        <SubmitButton onClick={(event)=>{getTransactionData()}}> Two years' Transaction data Ready for Retrieve </SubmitButton>)
        : null}
        
        {transactionData.length ? <SubmitButton onClick={(event) => addTransactionFromPlaidDatabase(id)}> Reviewed and accept all transaction data from {transactionData[0].bankname.toUpperCase()} </SubmitButton>: <div> </div>}
        

        {transactionData.length? 
            <div>

            
            <Tablediv>
            
            <table> 
                <thead>
                    <tr key="itemname">
                        <th id="name" > date </th>
                        <th id="type" style={{width : "20%"}}> name </th>
                        
                        <th> amount </th>
                        <th> bankname </th>
                        <th> category </th>

                    </tr>
                </thead>
                
                <tbody>
                {transactionData.map(
                    (transactionData, index) => 
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
            <br/>
            
        </Tablediv> 
        
        </div>    
        
            : null}
      </div>

    );
  };
