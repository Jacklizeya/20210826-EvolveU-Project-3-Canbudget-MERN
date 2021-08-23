Heroku Access:  https://canbudget.herokuapp.com/
 
# Running Procedure 
1 get ngrok running and client and server's .env files set up
2 cd server, npm run dev
3 cd client, npm start
4 go to localhost://4444

## client side .env file
PORT=4444
GENERATE_SOURCEMAP=false

## server side .env file
NODE_ENV = development
MONGODB_URL= (* set up your own mongo db database *)
PORT=3000
CLIENT_ID = (* set up your own PLAID API client id *)
SECRET = (* set up your own PLAID API secret *)
NGROK =  (* you will get this after you set up your ngrok *)
CLIENTPORT = http://localhost:4444
GOOGLE_MAPS_API_KEY=   (* set up your own Google API secret *)


## set up ngrok on server's .env file: 
 1. download ngrok to your server folder, (mine is Linux system, use your windows or mac version) 
 2. on server terminal do   ./ngrok http 3000 
 3. it will show you a cloud address, copy and paste that to server's .env file and use it for ngrok 
 4. ngrok is only valid for 2 hours if you are using the development tier, restart ngrok every 2 hours