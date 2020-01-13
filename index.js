//import express from 'express'; //ES2015 module syntax
const express = require ('express');

const Hubs = require('./data/hubs-model.js'); //our Hubs database library

const server = express();

// middlewar: teaches express new things
server.use(express.json()); //needed to parse JSON

// routes or endpoints

//GET to "/"
server.get('/', function(request, response){
    response.send({ hello: 'Web 25!'});
});

// see a list of Hubs
server.get('/api/hubs', (req, res) => {
    //read the data from the database (Hubs)
    Hubs.find() //return a promise
    .then( hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        res.status(500).json({ errorMessage: "sorry, we ran into an error getting the list of hubs"})
    })
})

// create a Hub

server.post('/api/hubs', (req, res) => {
    const hubData = req.body; //for this to work you need the server to use(express.json()); above

    //never trust the client, validate the data. For now, we trust the data for the demo
    Hubs.add(hubData)
    .then(hub => {
        res.status(201).json(hub);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "sorry, we ran into an error creating hubs"});
    });
});

// delete a Hub

server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(deleted => {
        // res.status(204).end();
        res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

// update a Hub: extra excercise


const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));

//fork > clone > type : "npm i" in the project folder to get the dependecies.
//type: "npm i express" (no quotes) to install the express library
//add the index.js file with code the root folder
//to run the server type: "npm run server"
//make a GET request to localhost:8000 using Postman or Insomina