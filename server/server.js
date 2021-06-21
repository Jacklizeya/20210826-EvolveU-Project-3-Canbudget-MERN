require('dotenv').config();

const app = require('./app')
const dotenv = require('dotenv'); 
const result= dotenv.config();
if (result.error)
{
    console.error("Dotenv:", result.error);
}


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('CanBudget server listening on port ' + port)
})
