# CanBudget

Heroku Access: https://canbudget.herokuapp.com/

## Running Procedure

### 1) Set up environment variables
  #### 1a) Create .env file in client folder
    PORT=4444
    GENERATE_SOURCEMAP=false
  #### 1b) Create .env file in server folder
    NODE_ENV = development
    MONGODB_URL= (_ set up your own mongo db database _)
    PORT=3000
    CLIENT_ID = (_ set up your own PLAID API client id _)
    SECRET = (_ set up your own PLAID API secret _)
    NGROK = (_ you will get this after you set up your ngrok _)
    CLIENTPORT = http://localhost:4444

### 2) Set up ngrok: https://ngrok.com/
  1.  download ngrok to your server folder, (mine is Linux system, use your windows or mac version)
  2.  on server terminal do ./ngrok http 3000
  3.  it will show you a cloud address, copy and paste that to server's .env file and use it for ngrok
  4.  ngrok is only valid for 2 hours if you are using the development tier, restart ngrok every 2 hours

### 3) Open a new terminal. Enter the following in the command line: 
  cd server, npm run dev
### 4) Open a new terminal. Enter the following in the command line: 
  cd client, npm start

#### The application should now be running at http://localhost:4444