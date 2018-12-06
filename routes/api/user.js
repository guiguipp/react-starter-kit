const user = require("express").Router()
const db = require("../../models")

const moment = require("moment");

user.get("/", function(req, res) {
    db.User.find({}, null, {sort: {name: 1}})
        .then(function(dbUser){
            res.send(dbUser)
        })
        .catch(function(err){
            res.send(err)
        })
    })

user.get("/:id", function(req, res) {
    console.log("req.params in user get route: ", req.params)
    db.User.findById(req.params.id)
        .then(function(dbUser){
            res.send(dbUser)
        })
        .catch(function(err){
            res.send(err)
        })
    })

user.get("/:field/:data", function(req, res) {
    db.User.findById(req.params.id)
        .then(function(dbUser){
            res.send(dbUser)
        })
        .catch(function(err){
            res.send(err)
        })
    })                      


user.post("/", function(req, res) {
    console.log("req.body in user post route: ", req.body)
    console.log("req.body.user.name in user post route: ", req.body.user.name)

    var newUser = db.User
    ({
        name: req.body.user.name,
        email: req.body.user.email
    })
    
    newUser.save()
        .then(function(dbUser){
            // console.log(res)
            res.send(dbUser)
        })
        .catch(function(err){
            res.send(err)
        })

    })

user.put("/:id", function(req, res) {
    let updateObj = { updated: moment(), ...req.body.data }
    db.User.findByIdAndUpdate(req.params.id, updateObj, {new: true}) 
        .then(function(dbUser){
            console.log("dbUser: ", dbUser)
            res.send(dbUser)
            })
        .catch(function(err){
            res.send(err)
            }) 
    })

user.delete("/:id", function(req, res) {
    db.User.findByIdAndDelete(req.params.id)
    .then(function(dbUser){
        res.send(dbUser)
        })
    .catch(function(err){
        res.send(err)
        }) 
    })

module.exports = user;