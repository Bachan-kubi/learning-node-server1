const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// crud
// bvSXjHEq91UeTAE6


const uri = "mongodb+srv://crud:bvSXjHEq91UeTAE6@cluster0.cmuajht.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,
});

  async function run(){
    try{
      const userCollection = client.db('crudOperations').collection('users');
      app.get('/users', async (req, res)=>{
        const query = {};
        const cursor = await userCollection.find(query).toArray();

        // { method-2
          // const users = await cursor.toArray();
        // res.send(users);}
        res.send(cursor);
      });

      app.get('/users/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await userCollection.findOne(query);
        res.send(result);
      });

      app.put('/users/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: ObjectId(id)};
        const user = req.body;
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name: user.name,
            adress: user.adress,
            email: user.email
          }
        };
        const result =  await userCollection.updateOne(filter, updateDoc, options);
        res.send(result);        
      })

      app.delete('/users/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        // console.log('heat id!', id);
        const result = await userCollection.deleteOne(query);
        // console.log(result);
        res.send(result);
      });

      app.post('/users', async (req, res)=>{
        const user= req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      })
    }
    finally{}
  }
  
  run().catch(err=>console.log(err));


app.get("/", (req, res) => {
  res.send("Learning mongodb from scratch!");
});

app.listen(port, () => {
  console.log(`simple node app is listening to the post ${port}`);
});
