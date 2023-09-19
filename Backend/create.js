const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const uri =
  "mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { code, share } = req.body;
  console.log(code, share)
  try {
    await client.connect();
    const database = client.db("codeExchange");
    const collection = database.collection("code");
    let result;

    const findBlock = await collection.findOne({ share: share });
    
    if (findBlock) {
       result = await collection.updateOne(
        { share: share },
        {
          $set: {
            code: code,
          },
        }
      );
    } else {
       result = await collection.insertOne({
        code: code,
        share: share,
      });
    }    
    if (result) res.json({ isSuccess: true });
    else res.json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.json({ isSuccess: false });
  }
});

module.exports = router;
