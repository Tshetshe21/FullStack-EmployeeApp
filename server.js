//importing your relevant packages
//similar to import {package} from "react...." in react.js
const express = require("express");
const admin = require("firebase-admin");


const  cors = require('cors')
//Initialise
const serviceAccount = require("./key.json");
const app = express();
//Connect firebase to node.js
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();
//
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
//HTTP REQUESTS ARE POST(adding), PUT(updating), DELETE(deleting) AND GET(retrieving)
//What is used in the front end to add a new employee: /addEmployee
//Defining our endpoint....>>>>>
app.post("/addEmployee", async (req, res) => {
    //creating the object that stores all the employee information
    const employees = {
        name: req.body.name,
        email: req.body.email,
    };
    //adding the employees information to the employees collection in firestore
    const response = db.collection("employees").add(employees);
    //send the response back to the client so they can see the data was added
    res.send(response);
});


app.get ("/getEmployees", async(req,res)=>{

    try { const userRef = db.collection("employees");
    const employees = await userRef.get();
    let responseArray = [];

    employees.forEach((doc)=>{
        responseArray.push(doc.data());
    });

    res.json(responseArray);

    }
    catch (error) {
        res.status(500).send(error.message);
    }
})


//Define the port the server will run on
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("server running")
});


