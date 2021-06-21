const dotenv = require('dotenv'); 
const result= dotenv.config();
if (result.error)
{
    console.error("Dotenv:", result.error);
}
