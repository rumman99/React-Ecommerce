require('dotenv').config()
const express= require("express");
const bodyParser= require("body-parser");
const cors= require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@am-mart-cluster.0xnpldl.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const app= express();
app.use(cors(
	    {
		origin: ["https://am-mart.vercel.app"],
		method: ["POST", "GET"],
		credentials: true
	    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("am-mart-DB").command({ ping: 1 });
    const productCollection= client.db("am-mart-DB").collection("products");
    const orderCollection= client.db("am-mart-DB").collection("orders");

    console.log("You successfully connected to MongoDB!");

    ////// View All Product on UI
        app.get('/', (req, res)=>{
            productCollection.find({}).toArray()
            .then(result => res.send(result))
            .catch(err => console.log(err))
        });

    ////// View Single ProductInfo on UI by Key
        app.get('/product/:key', (req, res)=>{
            productCollection.find({key: req.params.key}).toArray()
            .then(result => res.send(result))
            .catch(err => console.log(err))
       });

    ///// Create Many Post
        app.post('/addProducts', (req, res)=>{
            const products= req.body;
            productCollection.insertMany(products)
            .then(result => console.log("Insert To DB"))
            .catch(err => console.log(err))
        });

    ///// View Multiple Product to Review based on Key///
        app.post('/productsReview', (req, res)=>{
            const reviewProductsKeys= req.body
            productCollection.find({key: {$in: reviewProductsKeys}}).toArray()
            .then(result => res.send(result))
            .catch(err => console.log(err))
          })

    ////// Add Order Details to Orders Collection/////
        app.post('/confirmOrder', (req, res)=>{
          const orderDetails= req.body;
          orderCollection.insertOne(orderDetails)
          .then(result => res.send(result))
          .catch(err => console.log(err))
        });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(3333, console.log("Listening to PORT 3333"));