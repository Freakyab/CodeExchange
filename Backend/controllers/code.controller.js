const express = require("express");
const router = express.Router();
const Code = require("../models/code.model");

/*
 * POST : /create
 */

router.post("/create", async (req, res) => {
  try {
    const { code, share } = req.body;
    console.debug("Create request received");
    let result = {};

    const findBlock = await Code.findOne({ share }).exec();

    if (findBlock) {
      result = await Code.updateOne(
        { share: share },
        {
          $set: {
            code: code,
            flag : true,
          },
        }

      );
    } else {
      const newCode = new Code({
        share,
        code,
        flag : true,
      });
      result = await newCode.save();
    }

    // Instead of setTimeout, consider using a background worker or job queue for more reliability.
    setTimeout(async () => {
      try {
        const updatedDocument = await Code.findOne({ share: share });
        if (updatedDocument?.code?.blocks?.length == 0) {
          await collection.deleteOne({ share: share });
        }
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }, 2000);

    if (result) res.json({ isSuccess: true });
    else res.json({ isSuccess: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
 * POST : /get
 */

router.post("/get", async (req, res) => {
  try {
    const { share } = req.body;
    const findBlock = await Code.findOne({ share }).exec();
    if (findBlock)
      res.json({ isSuccess: true, code: findBlock.code });
    else res.json({ isSuccess: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { share, paddedHexString } = req.body;

    const findBlock = await Code.findOne({ share });
    if (findBlock) {
      const result = await Code.updateOne(
        { share },
        { $push: { waitingList: paddedHexString } }
      );

      setTimeout(async () => {
        await Code.updateOne(
          { share },
          { $pull: { waitingList: paddedHexString } }
        );
      }, 10000);

      if (result) {
        res.json({ isSuccess: true });
      } else {
        res.json({ isSuccess: false });
      }
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
