
const http = require("http");
const { createServer } = require('node:http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://akhilsharmaa:akhilsharmaa@web-app.jydf5ef.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());


// Serve static files from the 'public' directory
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const uri = "mongodb+srv://akhilsharmaa:akhilsharmaa@agrohub.lhneogk.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable command buffering
  // other options...
});


// run().catch(console.dir);





// Import the Product model
const Product = require('./model.js'); // Adjust the path as per your file structure

app.post('/submit_product', (req, res) => {

    console.log(req.body);
    console.log("\n\n\n\n\n");

    // Create a new instance of the Product model
    const newProduct = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productImage: req.body.productImage
    });

    newProduct.save()
      .then(savedProduct => {
          console.log('Product saved successfully:', savedProduct);
          res.status(200).send('Product saved successfully');
      })
      .catch(error => {
          console.error('Error saving product:', error);
          res.status(500).send('Error saving product');
      });

    // res.render('home');
});

app.get('/submit_product', (req, res) => {
    res.render('home');
});

app.get('/addProduct', (req, res) => {
        res.render('addProduct');
});

app.get('/', (req, res) => {
        res.render('home');
});
  

server.listen(PORT, () => {
  console.log('\n\t🦊 server running at http://localhost:3000\t');
});

