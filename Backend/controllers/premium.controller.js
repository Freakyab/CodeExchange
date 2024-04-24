const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Premium = require("../models/premium.model");

/*
 * POST : /premium/create
 */
router.post("/create", auth, async (req, res) => {
  try {
    const { code, account, _id } = req.body;
    let result;
    let flag = false;

    const findDoc = Premium.findOne({ account }).exec();

    if (findDoc) {
      result = await Premium.updateOne(
        { account: account },
        {
          $set: {
            code: code,
          },
        }
      );
    } else {
      const count = await Premium.countDocuments({ owner: _id });
      if (count >= 5) {
        flag = true;
      } else {
        result = await Premium.insertOne({
          code: code,
          account: account,
          owner: _id,
        });
      }
    }
    setTimeout(async () => {
      try {
        const updatedDocument = await Premium.findOne({ account: account });
        if (updatedDocument?.code?.blocks?.length == 0) {
          await Premium.deleteOne({ account: account });
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }, 2000);
    if (flag) res.json({ isSuccess: false, message: "Limit Exceeded" });
    else if (result) res.json({ isSuccess: true });
    else res.json({ isSuccess: false });
    res.status(201).json({ flag: result.flag, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
 * POST : /premium/get
 */

router.post("/get", auth, async (req, res) => {
  const { account } = req.body;
  try {
    const findBlock = await Premium.findOne({ account }).exec();
    if (findBlock)
      res.json({ isSuccess: true, code: findBlock.code, _id: findBlock.owner });
    else res.json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.json({ isSuccess: false });
  }
});

module.exports = router;