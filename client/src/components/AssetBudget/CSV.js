import React from 'react'
import {FlatfileButton} from "@flatfile/react"
import axios from 'axios'

export default function CSV({id, setAddStatus}) {

    return (
        <div>
        
        <FlatfileButton
          style = {{  
            cursor: 'pointer',
            padding: '10px',
            color: 'white',
            backgroundColor: '#01345B',
            borderRadius: '20px',
            border: '2px solid #01345B',
            fontWeight: 'bold',
            margin: '10px'
          }}
          licenseKey="f95e2ceb-5689-4daf-9f77-e3250d18b99a"
          customer={{ userId: "12345" }}
          settings={{
            type: "Transaction",
            fields: [
              { label: "Date", key: "date" },
              { label: "Business", key: "name" },
              { label: "Amount", key: "amount" },
              { label: "Bankname", key: "bankname" },
              { label: "Category", key: "category" },
            ],
            managed: true
          }}
          onData={async (results) => {
            // do something with the results
            // console.log(results.data)
            let incomeDataFromCSV = results.data
            console.log("incomeDataFromCSV", incomeDataFromCSV[0])
            let transformedIncome = incomeDataFromCSV.map(({date, name, amount, bankname, category}) => {amount = Number(amount); let transaction_id="null"; 
            return {
                transaction_id,
                date,
                name,
                bankname,
                amount,
                category             
              }
              })
            console.log("transformedData", transformedIncome[0])
            let {data} = await axios.put(`/api/user/${id}/addtransaction`, transformedIncome, {headers : {"Content-Type": "application/json"}})
            console.log(data)
            if (data.ok) {
              setAddStatus(1);
              return "CSV data added Successfully"
          } else {throw new Error("Unable to add CSV Data to database")}
          }}
        >
          Import transactions from CSV
        </FlatfileButton>
        </div>
    )
}
