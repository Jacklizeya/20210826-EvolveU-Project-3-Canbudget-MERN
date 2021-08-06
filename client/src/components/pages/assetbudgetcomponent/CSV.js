import React from 'react'
import {FlatfileButton} from "@flatfile/react"

export default function CSV({id, setAddStatus}) {



    return (
        <div>
        
        <FlatfileButton
            style = {{  color: "white",
                        background: "#01345B",
                        fontsize: "1em",
                        padding: "0.5em 1.5em",
                        border: "2px solid #01345B",
                        borderradius: "3px",
                        width: "300px",
                        height: "40px",
                        margin: "10px 20px 10px 40px"}}
            licenseKey="f95e2ceb-5689-4daf-9f77-e3250d18b99a"
            customer={{ userId: "12345" }}
            settings={{
              type: "Transaction",
              fields: [
                { label: "Date", key: "date" },
                { label: "Mechant", key: "merchant" },
                { label: "Amount", key: "amount" },
                { label: "Bankname", key: "bankname" },
                { label: "Category", key: "category" },
              ],
              managed: true
            }}
            onData={async (results) => {
              // do something with the results
              return "Done!";
            }}
        >
          Import Transaction From CSV
        </FlatfileButton>
        </div>
    )
}
