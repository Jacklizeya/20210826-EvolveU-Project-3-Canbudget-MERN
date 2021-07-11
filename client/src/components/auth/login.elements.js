import styled from 'styled-components';

export const LoginFormDiv = styled.div`


h1 {
  text-align: center;
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
}

label,p {
  line-height: 2;
  display:block;
  margin: auto;
  position: relative;
  text-align:left;
  font-family: "Lucida Console", "Courier New", monospace;
  width: 40%; /* Full width */
  margin-top: 6px; /* Add a top margin */
}
 
p {
    color: #800000;
}

`


export const SubmitCancelButtons = styled.div`
    display: flex; 
    justify-content: center;  
    `


export const SubmitButton8 = styled.button`
    color: white;
    background: #01345B;
    margin:1em;
    font-size: 1em;

    `

export const SubmitButton2 = styled.button`
    background: #01345B;
    font-size: 1em;
    padding: 0em 0em ;

    margin: 0 auto;
    display: block;
 
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



