const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const uri =
  "mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { code, account, _id } = req.body;
  try {
    let flag = false;
    await client.connect();
    const database = client.db("codeExchange");
    const collection = database.collection("premium");
    let result;

    const findBlock = await collection.findOne({ account: account });

    if (findBlock) {
      result = await collection.updateOne(
        { account: account },
        {
          $set: {
            code: code,
          },
        }
      );
    } else {
      const count = await collection.countDocuments({ owner: _id });
      if (count >= 5) {
        flag = true;
      } else {
        result = await collection.insertOne({
          code: code,
          account: account,
          owner: _id,
        });
      }
    }

    // Instead of setTimeout, consider using a background worker or job queue for more reliability.
    setTimeout(async () => {
      try {
        const updatedDocument = await collection.findOne({ account: account });
        if (updatedDocument?.code?.blocks?.length == 0) {
          await collection.deleteOne({ account: account });
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }, 2000);
    if(flag) res.json({ isSuccess: false, message: "Limit Exceeded" });
    else if (result) res.json({ isSuccess: true });
    else res.json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.json({ isSuccess: false });
  }
});

module.exports = router;
