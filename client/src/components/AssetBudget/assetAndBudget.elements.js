import styled from 'styled-components';

export const Heading1 = styled.h1`
  padding: 20px;
  color: #01345B;
  text-align: center;
`
export const Descriptiondiv = styled.div`

    display: ${props => (props.viewScenario === "all record" ? "none": "block")};
    margin: 10px 20px 10px 40px;
    color: #01345B;
    input[type=text], input[type=date], textarea {
      width: 25%; /* Full width */
      padding: 12px; /* Some padding */ 
      border: 1px solid #ccc; /* Gray border */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 6px; /* Bottom margin */
      }
`
export const Tablediv = styled.div`
   

  margin: 10px 20px 10px 40px;
  font-family: 'Source Sans Pro',sans-serif;

  table {

    border: #01345B 2px solid;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-collapse: collapse;
    padding: 5px;
    text-align: center;
   
   

    th, td {
      border: #01345B 2px solid;
      border-collapse: collapse;
      padding: 5px;
      text-align: center;
    }
  
    th {
      background: #01345B;
      color: white;
    }

   tfoot{
     tr {
      display: ${props => (props.id === "all record" ? "none": "")};
      display: ${props => (props.value === "all record" ? "none": "")};
      display: ${props => (props.viewScenario === "all record" ? "none": "")};
     }  
   }
 }
`
export const Tablefoot = styled.tfoot`
  display: ${props => (props.viewScenario === "all record" ? "none": "")};
  tr {
    height: 10px; 
   }

   th, td {
     width: auto;
     padding: 0.5rem;
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     font-family: 'Source Sans Pro',sans-serif;

     :last-child {
       border-right: 0;
     }
   }
  
   th {
     width: auto;
     background: #01345B;
     border-bottom: 3px solid;
     color: white;
     fontWeight: bold;
   }
`

export const Numbertd = styled.td`
  color: ${props => (props.value >= 0 ? "black": "red")};
`

export const SubmitButton = styled.button`
    color: white;
    background: #01345B;
    font-size: 1em;
    padding: 0.5em 1.5em;
    border: 2px solid #01345B;
    border-radius: 3px;
    margin: 0.25em 0.5em;
`;

export const StockButton = styled.button`
    color: white;
    background: #01345B;
    font-size: 1em;
    padding: 0.5em 1.5em;
    border: 2px solid #01345B;
    border-radius: 3px;
    width: 200px;
    height: 40px;
    margin: 10px 20px 10px 40px;
`;

export const TransactionButton = styled.button`
    color: white;
    background: #01345B;
    font-size: 1em;
    padding: 0.5em 1.5em;
    border: 2px solid #01345B;
    border-radius: 3px;
    width: 300px;
    height: 40px;
    margin: 10px 20px 10px 40px;
`;

export const PlaidButton = styled.button`
    cursor: pointer;
    padding: 10px;
    color: white;
    background-color: #01345B;
    border-radius: 20px;
    border: 2px solid #01345B;
    font-weight: bold;
    margin: 10px;
`;

export const FormDiv = styled.div`

    margin: 10px 20px 10px 40px;
    color: #01345B;
   
    input[type=text], input[type=date], textarea {
      width: 25%; /* Full width */
      padding: 12px; /* Some padding */ 
      border: 1px solid #ccc; /* Gray border */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 6px; /* Bottom margin */
    }

    select {
      background: white;
      width: 25%; /* Full width */
      padding: 12px; /* Some padding */ 
      border: 1px solid #ccc; /* Gray border */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 6px; /* Bottom margin */
    }

    label {
      color: #01345B;
    }
}
`
export const TableBottomData = styled.td` 

  color: ${props => (props.value? (props.value > 0 ? "white": "white"): "white")};
  background: ${props => (props.value? (props.value > 0 ? "green": "red"): "#01345B")};
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  font-family: 'Source Sans Pro',sans-serif;
  width: auto;
  
  :last-child {
    border-right: 0;
  }

`


// ------------------------------ Vladimir's part below -----------------------------

export const Centeredh3 = styled.h3`
color: #01345B;
text-align: center;
`


export const SubmitCancelButtons = styled.div`
    display: flex; 
    justify-content: center;  
    `

export const LoginFormDiv = styled.div`
    h1 {
      text-align: center;
      color: #01345B;
    }
    
    
    input, select, textarea {
    
        display:block;
        margin: auto;
        width: 40%; /* Full width */
        padding: 12px; /* Some padding */ 
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 0px; /* Add a top margin */
        margin-bottom: 6px; /* Bottom margin */
        color: #01345B;
      }
    
    label,p {
      line-height: 2;
      display:block;
      margin: auto;
      position: relative;
      text-align:left;
      font-family: 'Source Sans Pro',sans-serif;
      width: 40%; /* Full width */
      margin-top: 6px; /* Add a top margin */
      color: #01345B;
    }
     
    p {
        color: #800000;
    }
    
    `
    
  export const Heading3 = styled.h3`
  padding: 20px;
  color: #01345B;
  text-align: center;
  `  

    export const CloseButtonSmall = styled.input`
    float: right;
    width:32px;
    width:32px; 
    color: #01345B;
    `
    export const WatchElement = styled.div`
    border-style: solid;
    padding: 6px 12px;
    border-radius: 12px;
    color: #01345B;
    `

    export const TopBottomArrow = styled.input`
      width:32px;
      width:32px;
      color: #01345B;
    
    `

    export const SmartSearchList = styled.div`
    :hover {
      background-color: grey;
    }
    `
    
    export const PortolioDiv = styled.div`
    color: #01345B;
    td{
      text-align: center;
      vertical-align: top;
      width:50ch;
    }
    th{
      text-align: center;
      vertical-align: top;
    }
    table{
      width: 45ch;
    }
    div{
      position: fixed;
    }
    `
    
    export const BoxDiv = styled.div`
    color: #01345B;
    border: 2px solid #01345B;
    border-radius: 5px;
    text-align: center;
    `

    export const FixedDiv = styled.div`
    color: #01345B;
    position: fixed;
      `

    export const VeryLongTextTD = styled.td`
    color: #01345B;
    word-wrap: break-word;    
    `


//     This is a sample from Iryna
//     export const MemberWrapper = styled.div`
//     max-width: 1300px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: 1.3fr 1.3fr 1.3fr 1.3fr;
//     align-items: center;
//     grid-gap: 16px;
//     padding: 0 50px;

//     @media screen and (max-width: 1000px) {
//         grid-template-columns: 1fr 1fr;
//     }

//     @media screen and (max-width: 768px) {
//         grid-template-columns: 1fr;
//         padding: 0 20px;
//     }
// `;
  // margin: 10px 20px 10px 40px;