/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require("express-jwt");

/**** Configuration ****/
const app = express();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/QnA';

async function createServer() {
  // Connect db
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create data
  const questionDB = require('./questionDB')(mongoose);
  await questionDB.bootstrap();

  // Require routes
  const routes = require("./routes")(questionDB); // Inject mongoose into routes module

  // Add middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined'));
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build')));


  // Open paths that do not need login.
  // You can use various formats to define the open paths.

  const openPaths =
    // Open "/api/users/authenticate" for POST, DELETE, PUT requests
    [{ url: "/api/users/authenticate", methods: ["POST"] },
      //{ url: "api/QnA", methods: ["GET"] },
      // Open everything that doesn't begin with "/api"
      /^(?!\/api).*/gim,
    //this is a regular expression, opening everything with this router even after QnA like ID's
    { url: /\/api\/QnA\.*/gim, methods: ["GET"] }

    ];

  //the secret value. the defualt is love is love 
  const secret = process.env.SECRET || "love is love";

  //validate the user token  using checkJwt middleware
  //unless er exclude from the checkjwt
  app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));

  // this middleware checks the result of checkJwt above 
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") // if the user didnt  authroize correctly 
    {
      res.status(401).json({ error: err.message });
    } else {
      next(); //if no errors, forward  request to next middleware or route handler 
    }
  });

  //fra linje 49-63 er vigtige for at tjekke middleware og token

  const usersRouter = require("./usersRouter")(secret);

  // Add routes
  app.use("/api/QnA", routes);
  app.use("/api/users", usersRouter);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );

  return app;
}

module.exports = createServer;