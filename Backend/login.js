const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority'
    );

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        await client.connect();
        const db = client.db('codeExchange');
        const collection = db.collection('accounts');
        const user = await collection.findOne({username});     
        if (user && user.password === (password)) {
            res.json({ success: true,id : user._id ,name : user.name });
        } else {
            res.json({ success: false });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
}
);

module.exports = router;
