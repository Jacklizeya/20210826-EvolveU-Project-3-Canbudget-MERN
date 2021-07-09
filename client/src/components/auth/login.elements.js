import styled from 'styled-components';

export const LoginFormDiv = styled.div`

position: relative;
h1 {
  text-align: center;
}


input, select, textarea {
display:block;
margin: auto;


width: 25%; /* Full width */
padding: 12px; /* Some padding */ 
border: 1px solid #ccc; /* Gray border */
border-radius: 4px; /* Rounded borders */
box-sizing: border-box; /* Make sure that padding and width stays in place */
margin-top: 6px; /* Add a top margin */
margin-bottom: 6px; /* Bottom margin */

}

label,p {
  line-height: 2;
  display:block;
  margin: auto;
  position: relative;
  text-align:left;
  font-family: "Lucida Console", "Courier New", monospace;

  width: 25%; /* Full width */

  margin-top: 6px; /* Add a top margin */
 
}
p {
  color: "red";
}

button{
  justify-content: center;
  position:relative;
  display:inline-block;
  vertical-align:middle;
}
}
`
