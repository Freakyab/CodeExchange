const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const uri =
  "mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { owner } = req.body;
  try {
    console.log(owner);
    await client.connect();
    const database = client.db("codeExchange");
    const collection = database.collection("premium");

    const findBlock = await collection.find({ owner: owner }).toArray();
    console.log(findBlock);
    if (findBlock) res.json({ isSuccess: true, keywords: findBlock.map((block) => block.account) });
    else res.json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.json({ isSuccess: false });
  }
});

module.exports = router;
