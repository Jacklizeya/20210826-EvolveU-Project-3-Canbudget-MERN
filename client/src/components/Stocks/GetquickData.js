import io from "socket.io-client"

const targetURL = process.env.NODE_ENV === "production" ? window.location.hostname : "http://localhost:3000"

const socket = io(targetURL, {
  extraHeaders: {
    'plaid-transaction': 'CanBudget'
  }
})
