require("./appSmall")
const userDB = require("../models/user");

console.log("Start")
let user = {
    firstName: "Paul",
    lastName: "McCartney",
    birthdate:  new Date(1945, 11, 17),
    phone: "911",
    eMail: "paulMcCartmey@gmail.com"
  };

//userDB.createUser(user).then(console.log("End"));

userDB.getUserList().then((c) => console.log(c));
