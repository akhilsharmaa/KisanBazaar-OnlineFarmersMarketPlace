
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


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable command buffering
  // other options...
});

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
      productImage: req.body.productImage,
      mobileNumber: req.body.mobileNumber,
      userLocation: req.body.locationInput
    });

    newProduct.save()
      .then(savedProduct => {
          
          console.log('Product saved successfully:', savedProduct);
          res.render('success');

          
      })
      .catch(error => {
          console.error('Error saving product:', error);
          res.status(500).send('Error saving product');
      });

});

app.get('/submit_product', (req, res) => {
    res.render('home');
});

app.get('/addProduct', (req, res) => {
        res.render('addProduct');
});


async function getProductData() {

  try {

    const database = client.db('test'); // Replace 'test' with your database name
    const collection = database.collection('product'); // Replace 'product' with your collection name

    // Query for documents
    const products = await collection.find({}).toArray();

    return products;
  } catch (err) {
    console.error('Error: ', err);
    throw err; // Re-throw the error to be caught by the caller
  } finally {
    await client.close();
  }
}


app.get('/', async (req, res) => {

    const products = await Product.find({}).exec();
    console.log(products);
    res.render('home', { products });
    
});


// Function to find product by _id
async function findProductById(productId) {

  try {
      // Use findById method to find product by _id
      const product = await Product.findById(productId);
      if (product) {
        console.log('Found product:', product);
      } else {
        console.log('Product not found');
      }
  } catch (error) {
    console.error('Error finding product by id:', error);
  }

}


// app.get('/product', async (req, res) => {
// // 65beb4b55418a669418122ac
//     findProductById("65beb4b55418a669418122ac")
//     res.render('detailedProduct');
// });

app.get('/product/:productId', async (req, res) => {
  try {
      const productId = req.params.productId;

      // Find the product by its ID in the database
      const product = await Product.findById(productId);

      if (!product) {
          // Product not found
          res.status(404).send('Product not found');
          return;
      }

      // Render the detailed product page with the product data
      res.render('detailedProduct', { product });
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Error fetching product');
  }
});

  

server.listen(PORT, () => {
  console.log('\n\t🦊 server running at http://localhost:3000\t');
});

