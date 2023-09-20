const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

connectToDatabase(); // Connect to MongoDB when the server starts

io.on("connection", (socket) => {
  socket.on("get", async (share) => {
    try {
      const database = client.db("codeExchange");
      const collection = database.collection("code");

      const findBlock = await collection.findOne({ share: share });
      if (findBlock) {
        socket.emit("get", findBlock.code);
      }
    } catch (e) {
      console.error("Error handling 'get' event:", e);
    }
    socket.join(share);
  });


  socket.on("update", async (code, share) => {
    try {
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
      if (result) {
        socket.to(share).emit("update", code);
      }
    } catch (e) {
      console.error("Error handling 'update' event:", e);
    }
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Uncommented middleware and routes (if needed)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
