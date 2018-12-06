// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express" );
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config()
const path = require('path');


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// logging the requests
const morgan = require("morgan");
app.use(morgan("dev"));

// DB connection
let development = {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
}
// Setup database name in an .env file at the root of the project
const URL = process.env.MONGODB_URI || "mongodb://localhost/"+ development.database
// For pw locked db, use:  
// "mongodb://"+ development.username + ":" + development.password + "@localhost:27017/" + development.database


mongoose.connect(URL, { autoIndex: false, useNewUrlParser: true});
console.log(URL," (connected)")
const db = mongoose.connection

// handle mongo errors
db.on("error", console.error.bind(console,"Connection error"));
db.once("open", () => console.log("connected to the DB collection " + development.database) )

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Routes
// =============================================================
const routes = require("./routes")
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        console.log("req.params in server.js:\n ", req.params)
        res.sendFile(path.join(__dirname + "/client/build/", 'index.html'));
    });
    }

app.listen(PORT, function(){
console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
