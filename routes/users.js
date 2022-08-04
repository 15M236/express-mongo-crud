var express = require('express');
const { resource } = require('../app');
var router = express.Router();
const {dburl,mongodb,MongoClient,dbName} = require('../dbSchema.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/all' , async(req,res) => {
  const client = await MongoClient.connect(dburl)
  try {
    const db = await client.db(dbName)
    let users = await db.collection('user').find().toArray();
    res.json({
      statusCode : 200,
      data : users 
    })
  }catch (err) {
    console.log(err)
    res.json({
      statusCode : 500,
      message : "Internal Server Error"
    })
  }
  finally {
    client.close()
  }
})

router.post('/add-user' , async(req,res) => {
  // const newPost = new Post(req.body);
  // try {
  //   const savedPost = await newPost.save();
  //   res.status(200).json(savedPost);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  // const client = await MongoClient.connect(dburl)
  try {
    const db = await client.db(dbName)
    let users = await db.collection('user').insertMany(req.body);

    res.json({
      statusCode : 200,
      message : 'user created successfully',
      data : users 
    })
  }catch (err) {
    console.log(err)
    res.json({
      statusCode : 500,
      message : "Internal Server Error"
      
    })
  }
  finally {
    client.close()
  }
})

router.put('/edit-user/:id' , async(req,res) => {
  const client = await MongoClient.connect(dburl)
  try {
    const db = await client.db(dbName)
    let users = await db.collection('user').updateOne({_id:mongodb.objectId(req.params.id)},{
      $set:{name:req.params.name,
            email:req.body.email,
            role:req.body.role,
            password:req.body.password
      }
    })
    res.json({
      statusCode : 200,
      message : 'user Updated successfully'
    })
  }catch (err) {
    console.log(err)
    res.json({
      statusCode : 500,
      message : "Internal Server Error"
    })
  }
  finally {
    client.close()
  }
})

router.put('/delete-user/:id' , async(req,res) => {
  const client = await MongoClient.connect(dburl)
  try {
    const db = await client.db(dbName)
    let users = await db.collection('user').deleteOne({_id:mongodb.objectId(req.params.id)})
    res.json({
      statusCode : 200,
      message : 'user Deleted successfully'
    })
  }catch (err) {
    console.log(err)
    res.json({
      statusCode : 500,
      message : "Internal Server Error"
    })
  }
  finally {
    client.close()
  }
})

module.exports = router;