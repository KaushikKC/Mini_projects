import express from "express"
// const bodyParser = require('body-parser'); //old way of importing.
import bodyParser from "body-parser"; //ES 6
import path from "path"; //for loading files from a path. serve bootstrap site for example.
import lodash, { some } from "lodash";
import { MongoClient } from "mongodb";
import cors from "cors";

/**
 *  Example of using ES6 syntectic sugar to create Express JS server
 */

let connectionstring = '';
let cloudconnectionstring2 = '';

class ExpressServer {
  constructor(hostname = process.env.LOCAL_HOST,
    port = process.env.DEFAULT_PORT2,
    cloudconnectionstring = process.env.cloudconnectionstring,
    connectionstring2 = process.env.connectionstring
  ) {
    this.serverName = 'Express Server';
    this.hostname = hostname;
    this.port = port;

    //update connectionstring from env variables.
    cloudconnectionstring2 = cloudconnectionstring;
    connectionstring = connectionstring2;

    //Auto Start Server
    this.initServer()

    //const cl = new MongoClient("mongodb://localhost:27017");
    //this.connectionstring = 'mongodb://localhost:27017';


  }

  initServer = () => {
    //Create Server
    this.server = express()

    //setup cors
    this.server.use(cors());

    //setup the view engine. for showing views on the website
    //by default, ejs is looking for a folder called 'views' in the root of the folder
    console.log(`${path.join(__dirname)}`);
    this.server.set("view engine", "ejs");

    // for parsing application/json
    this.server.use(bodyParser.json());
    // for parsing application/x-www-form-urlencoded - form data
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // this.server.get('/user', (req, res)=> {
    //   res.send('Got a GET request at /user')
    //   // next()
    // })

    this.server.get('/dummycar', (req, res) => {
      const somecar = {
        "name": "Mach 5",
        "driver": "Speed Racer"
      }
      res.send(somecar)
      // next()
    })

    

    // this.server.put('/user', (req, res)=> {
    //   res.send('Got a PUT request at /user')
    //   // next()
    // })

    // this.server.delete('/user', (req, res)=> {
    //   res.send('Got a DELETE request at /user')
    //   // next()
    // })

    // this.server.post('/', (req, res, next) => {
    //   console.log(req);
    //   // next()
    //   });

    // this.server.get('/', (req, res)=> {
    //   res.send('Hello World from EXPRESS SERVER!')
    //   // next()
    // })

    this.server.get('/', (req, res) => {
      //display a simple form.
      res.render("SampleForm");
    })

    

    this.server.get('/SampleFormWithBS', (req, res) => {
      //display a simple form.
      res.render("pages/SampleForm");
    })

    this.server.post('/saveDataWithBS', (req, res) => {
      //log information sent through the form.
      console.log(`Fullname : ${req.body.fullname}`);
      console.log(`Email : ${req.body.email}`);

      const PersonDetails = {
        fullname: req.body.fullname,
        email: req.body.email
      }

      res.render('pages/FormDone', {
        PersonDetails: PersonDetails
      });
    })

    // about page
    this.server.get('/about', function (req, res) {
      res.render('pages/about');
    });

    //here let's start putting some mongo db stuff
    

    //update a hero
    
    this.server.get('/mongodb/returnsomemovieswithoutindexing', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("sample_mflix");
          const coll = dbs.collection("movies");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          //let resultOfDb = coll.find(query, options).limit(numberOfMovies);
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            movies: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.movies.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })    

    //note : you need to enable 'indexes' for this to work. 
    this.server.get('/mongodb/google', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("Companies_detail");
          const coll = dbs.collection("Google");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            details: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.details.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })

    this.server.get('/mongodb/apple', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("Companies_detail");
          const coll = dbs.collection("Apple");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            details: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.details.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })

    this.server.get('/mongodb/amazon', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("Companies_detail");
          const coll = dbs.collection("Amazon");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            details: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.details.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })

    this.server.get('/mongodb/netflix', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("Companies_detail");
          const coll = dbs.collection("Netflix");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            details: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.details.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })

    this.server.get('/mongodb/meta', (req, res) => {
      async function run() {
        let cl = new MongoClient(cloudconnectionstring2);
        try {
          await cl.connect();
          const dbs = cl.db("Companies_detail");
          const coll = dbs.collection("Meta");
          // query for movies that have a runtime less than
          const query = { runtime: { $lt: 100 } };
          const options = {

            // sort returned documents in ascending order by title (A->Z)

            sort: { title: 1 },

            // Include only the `title` and `imdb` fields in each returned document

            projection: { _id: 0, title: 1, imdb: 1 },

          };
          let numberOfMovies = 10;
          let resultOfDb = coll.find({}, {}).limit(numberOfMovies);
          // print a message if no documents were found

          if ((await resultOfDb.count()) === 0) {

            console.log("No documents found!");

          }

          // replace console.dir with your callback to access individual elements

          let responseObject = {
            details: []
          }

          await resultOfDb.forEach(function (x) {
            responseObject.details.push(x);
          });

          console.log(responseObject);

          res.send(responseObject);

          // await resultOfDb.forEach(console.dir);

        } catch (err) {
          console.warn("ERROR: " + err);
          if (errCallback) errCallback(err);
        } finally {
          await cl.close();
        }
      }
      run().catch(console.dir);
    })

    //note : you need to enable 'indexes' for this to work. 
    


    //Start Listening
    this.server.listen(this.port, (error) => {
      if (error)
        throw error;
      console.log(`${this.serverName} Started at http://${this.hostname}:${this.port}/`);
      console.log(`the connection string is ${this.cloudconnectionstring}`)
    })
  }
}

//EXPORT MODULE
module.exports = ExpressServer