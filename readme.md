# CanBudget
  Budgeting can be difficult for everyone. 
  Most Canadians have credit cards and bank accounts with multiple institutions, making it difficult to keep track of everything on your own. 
  Our app aims to provide an intuitive solution for tracking and visualizing your finances. 
  From seasoned budgeters to financial freshman, CanBudget is accessible for everyone.

  This application was created in a project based learning environment for the EvolveU Full Stack Development Program - Cohort 6.
  
  ##### CanBudget was created by the following developers:
    - Brady Walker-Brock (https://github.com/bwbcode)
    - Jack Zeya Li (https://github.com/Jacklizeya)
    - Iryna Tarasenko (https://github.com/Irynatar)
    - Vladimir Zhukov (https://github.com/vzhukovtnv)


  CanBudget is live! Visit us at: https://canbudget.herokuapp.com/

## Running Procedure

### 1) Set up environment variables
  #### a) Create .env file in client folder
    PORT=4444
    GENERATE_SOURCEMAP=false
  #### b) Create .env file in server folder
    NODE_ENV = development
    MONGODB_URL= <YOUR_MONGODB_URL>
    PORT=3000
    CLIENT_ID = <YOUR_PLAID_API_CLIENT_ID>
    SECRET = <YOUR_PLAID_API_SECRET>
    NGROK = <YOUR_NGROK_CLOUD_ADDRESS>
    CLIENTPORT = http://localhost:4444

### 2) Set up ngrok: https://ngrok.com/
  #### 2.1)  Install ngrok in your server folder (Jack used Linux - use Mac/Windows depending on your system)
  #### 2.2)  Open a new terminal. Enter the following line in the command line:
    ./ngrok http 3000
  #### 2.3)  Copy the cloud address to the server .env file
  #### 2.4)  ngrok is only valid for 2 hours if you are using the development tier. Restart ngrok every 2 hours.
### 3) Open a new terminal. Enter the following in the command line: 
    cd server, npm run dev
### 4) Open a new terminal. Enter the following in the command line: 
    cd client, npm start

#### The application should now be running at http://localhost:4444

CanBudget is a MERN stack application:
  M - MongoDB Atlas
  E - Express.js
  R - React
  N - Node.js

  For more instructions on how to develop within React please view README.md within the client folder.