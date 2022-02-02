const mongoose = require('mongoose');
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const SecretKey = "matthew-secret";

const port = process.env.PORT || 3001

const url ='mongodb+srv://mattvh2001:Mecer2001@cluster0.apiqf.mongodb.net/maintenance?retryWrites=true&w=majority'

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//Body parser is used to read data from the body. Body parser is deprecated but I had issues with the other method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

mongoose.connect(
    "mongodb+srv://mattvh2001:Mecer2001@cluster0.apiqf.mongodb.net/credentialManagement?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("database connected");
      } else {
        console.log(err.message);
      }
    }
  );

mongoose.Promise = global.Promise
let db = mongoose.connection
//let controllers = require('./controllers/job_controllers.js')
let users = require('../models/users.js')
let credentials  = require('../models/credentials.js');
const { rawListeners } = require('../models/users.js');

db.once('open',function(){
    console.log("db is open");
    app.listen(port, ()=>console.log('Listening engaged'))
})

//logs in the user and creates a jwt which is sent back to the client
app.post('/login', (req, res) => {
  const usr = req.body.username
  const pwd = req.body.password
  let userRes = "";

  users.findOne({username:usr},function(err, user){
    console.log("activated")
    if(err) {
    console.log(err);
    res.status(500).send({message: "Some error occurred while retrieving the user"});
    }
    else {

      if(user){
        userRes = user;

        if(pwd === userRes.password){
          payload = {
            'username': usr,
            'organisational_units': userRes.organisational_units,
            'divisions':userRes.divisions,
            'role': userRes.role,
          }
          const token = jwt.sign(JSON.stringify(payload), SecretKey,
          {algorithm: 'HS256'})
         
          res.send({auth: true,'token': token})
        }
        else{
          res.send({auth: false ,message:"Incorrect password"})
        }
      }
      else{
        res.send({auth: false, message:"Username not found in our database"})
      }
    }
    });
  })

  //adds a new user object to the database
  app.post('/registration', (req, res) => {
    console.log("activated")
    let usr = req.body.username;
    let userRes = new users(req.body);
    users.findOne({username:usr},function(err,user){ 
      if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while retrieving the user"});
      }
      else {
        if(user != null){
          res.send({message:"Username taken"})
        }
        else{
          userRes.save(function(err){
            res.send({message:"Registration successful!"})
            res.end()
            if(err) {
              console.log(err);
              res.status(500).send({message: "Some error occurred while trying to insert the user"});
              }
          })
        }
      }
      });
  })

  //Adds a new credential object to the database
  app.post('/new/credential', (req, res) => {
    console.log("activated new credential")
    let usr = req.body.username;
    let credRes = new credentials(req.body);
    credentials.findOne({username:usr},function(err,user){ 
      if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while retrieving the user"});
      }
      else {
        if(user != null){
          res.send({message:"Username taken"})
        }
        else{
          credRes.save(function(err){
            res.send({message:"Registration successful!"})
            res.end()
            if(err) {
              console.log(err);
              res.status(500).send({message: "Some error occurred while trying to insert the user credential"});
              }
          })
        }
      }
      });
  })

  //returns all the credential objects from the database which belong to the organisational unit and division posted in the body
  app.post('/credentials/division', (req, res) => {

    const auth = req.headers['authorization'];  
    const token = auth.split(' ')[1]
    console.log("tried to work it")
    try {
        const decoded = jwt.verify(token, SecretKey)
        if(decoded.organisational_units.includes(req.body.organisational_units) 
        && decoded.divisions.includes(req.body.divisions)){

          credentials.find({divisions: req.body.divisions,organisational_units: req.body.organisational_units},
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );   
        }
        else{
          res.status(500).send({'err': 'JWT not verified'})
        }
    }
    catch (err) {
        res.status(401).send({'err': 'Bad JWT!'})
    }
  })

  //returns all the user objects from the database which belong to the organisational unit and division posted in the body
  app.post('/user/division', (req, res) => {
    const auth = req.headers['authorization'];   
    const token = auth.split(' ')[1]
    console.log("tried to work it")
    try {
        const decoded = jwt.verify(token, SecretKey)
        if(decoded.organisational_units.includes(req.body.organisational_units) 
        && decoded.divisions.includes(req.body.divisions) && decoded.role === 'admin'){
          users.find({divisions: req.body.divisions,organisational_units: req.body.organisational_units},
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );   
        }
        else{
          res.status(500).send({'err': 'JWT not verified'})  
        }
    }
    catch (err) {
        res.status(401).send({'err': 'Bad JWT!'})
    }
  })

  //edits the data in a specific credential object's field
  app.put('/credentials/:user', (req, res) => {
    const auth = req.headers['authorization'];  
    const token = auth.split(' ')[1]
    try{
      const decoded = jwt.verify(token, SecretKey)
      if(decoded.role === 'admin' || decoded.role === 'manager'){
        let query = {username: req.params.user};
        credentials.findOneAndUpdate(query, req.body,
        {new: true}, function(err, doc){
        if(err) {
            console.log("Something went wrong when updating data.");
        }
            res.send("Updated");
        });
      }else{
        res.status(500).send({'err': 'JWT not verified'})
      }
      
    }
    catch (err) {
      res.status(401).send({'err': 'Bad JWT!'})
    }
  })

  //edits the data in a specific credential object's field (e.g. assigning/designing users from divisions and organisational units)
  app.put('/users/:user', (req, res) => {
    const auth = req.headers['authorization'];  
    const token = auth.split(' ')[1]
    try{
      const decoded = jwt.verify(token, SecretKey)
      if(decoded.role === 'admin'){
        console.log(" user put activated")
        let query = {username: req.params.user};
        console.log(query)
        console.log(req.body)
        users.findOneAndUpdate(query, req.body,
        {new: true}, function(err, doc){
        if(err) {
            console.log("Something went wrong when updating data.");
        }
        console.log("Something went right");
            res.send("Updated");       
        });
      }
      else{
        res.status(500).send({'err': 'JWT not verified'})
      }
    }
    catch (err) {
      res.status(401).send({'err': 'Bad JWT!'})
    }
  })


