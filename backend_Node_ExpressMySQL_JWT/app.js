
// require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');
const app         = express(); //  cree une application express

// import {initial} from './config/initial.js'


app.use(helmet())
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use(limiter ({
  windowMs: 5000,
  max: 200, 
  message: {
    code: 429,
    message: 'Too many connection; Try later !'
  }
}))

const db = require('./models/');
const Role = db.role;
db.sequelize.sync({ force: true })
.then(() =>  {
  console.log("Drop and re-sync db.");
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

})
.catch(error => res.status(500).json( {error}))


app.get ('/', (req, res, next) => {
  res.json({message: "Welcome to JWT + MySQL Application !"})
});


// routes
require('./routes/authRoute.js')(app);
require('./routes/userRoutes.js')(app);

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

