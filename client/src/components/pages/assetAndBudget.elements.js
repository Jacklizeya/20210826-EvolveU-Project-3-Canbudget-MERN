import styled from 'styled-components';

export const Heading1 = styled.h1`
    margin: 10px 20px 10px 40px;
    font-family: "Lucida Console", "Courier New", monospace;


`
export const Descriptiondiv = styled.div`

    display: ${props => (props.viewScenario === "all record" ? "none": "block")};
    margin: 10px 20px 10px 40px;
    font-family: "Lucida Console", "Courier New", monospace;

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
   font-family: "Lucida Console", "Courier New", monospace;

   table {
   border: 1px solid black;
   border-spacing: 0;

   tr {
    height: 10px; 
   }

   th, td {
     
     padding: 0.5rem;
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     font-family: "Lucida Console", "Courier New", monospace;

     :last-child {
       border-right: 0;
     }
   }
  
   th {
     background: #01345B;
     border-bottom: 3px solid;
     color: white;
     fontWeight: bold;
   }

   tfoot{
    display: ${props => (props.viewScenario === "all record" ? "none": "")};
   }
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

export const FormDiv = styled.div`

    margin: 10px 20px 10px 40px;
   
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
      font-family: "Lucida Console", "Courier New", monospace;
    }
}
`
export const TableBottomData = styled.td` 

  color: ${props => (props.value? (props.value > 0 ? "white": "white"): "white")};
  background: ${props => (props.value? (props.value > 0 ? "green": "red"): "#01345B")};
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  font-family: "Lucida Console", "Courier New", monospace;

  :last-child {
    border-right: 0;
  }

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

