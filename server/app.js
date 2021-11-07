const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://paras:paras@election-data.dfww9.mongodb.net/election-data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

const stateSchema = new mongoose.Schema({
    name : {type: String},
});
const citySchema = new mongoose.Schema({
    name : {type: String},
    stateId: {type: mongoose.Schema.Types.ObjectId},
});
const partySchema = new mongoose.Schema({
    name : {type: String},
});
const electionSchema = new mongoose.Schema({
    name : {type: String},
    year: {type:Date}
});
const State = mongoose.model('State', stateSchema)
const City = mongoose.model('City', citySchema)
const Party = mongoose.model('Party', partySchema)

// app.get('/todo', (req, res) => {
//     // get data from mongodb and pass it to view
//     Todo.find({}, (err,data)=> {
//         if(err) throw err;
//         res.render('todo', {todos: data});
//     })
   
// });
app.get('/state', (req, res) => {
    // get data from the view and add it to mongodb
    State.find({}, null, {sort: {name: 1}}, (err, data) => {
        if (err) return res.send(500, {error: err});
        return res.send(data);
    });       
});
app.get('/city', (req, res) => {
    const {stateId} = req.query;
    // get data from the view and add it to mongodb
    City.find({stateId}, null, {sort: {name: 1}},(err, data) => {
        if (err) return res.send(500, {error: err});
        return res.send(data);
    });       
});
app.post('/state', (req, res) => {
    // get data from the view and add it to mongodb
    var query = {'name': req.body.name};
    const existing = req.body;
    State.findOneAndUpdate(query, existing, {upsert: true,
        useFindAndModify: false}, (err, doc) => {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });       
});
app.post('/party', (req, res) => {
    // get data from the view and add it to mongodb
    var query = {'name': req.body.name};
    const existing = req.body;
    Party.findOneAndUpdate(query, existing, {upsert: true,
        useFindAndModify: false}, (err, doc) => {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });       
});
app.post('/city', (req, res) => {
    const {city,stateId} = req.body;
    // get data from the view and add it to mongodb
    var query = {'name': city, 'stateId': stateId};
    const existing = city;
    City.findOneAndUpdate(query, { "$set": { "name": city, "stateId": stateId}}, {upsert: true,  
        useFindAndModify: false}, (err, doc) => {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });       
});
// app.delete('/todo/:item', (req, res) => {
//      // delete the requested item from mongodb
//      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data)=> {
//         if(err) throw err;
//         res.json(data); 
//      })      
// });
app.listen(8000);