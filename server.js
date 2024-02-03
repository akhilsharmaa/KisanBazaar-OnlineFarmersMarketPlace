
const http = require("http");
const { createServer } = require('node:http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const axios = require("axios");
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://akhilsharmaa:akhilsharmaa@web-app.jydf5ef.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());


// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const uri = "mongodb+srv://akhilsharmaa:akhilsharmaa@agrohub.lhneogk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


app.post('/submit_product', (req, res) => {

    console.log(req.body.productName);

    const newProduct = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productCategory: req.body.productCategory,
      productImage: req.body.productImage
    });

    newProduct.save((err) => {
      if (err) {
        console.error('Error saving product:', err);
        res.status(500).send('Error saving product');
      } else {
        console.log('Product saved successfully:', newProduct);
        res.status(200).send('Product saved successfully');
      }
    });
});

app.get('/addProduct', (req, res) => {
        res.render('addProduct');
});
  

server.listen(PORT, () => {
  console.log('\n\t🦊 server running at http://localhost:3000\t');
});

