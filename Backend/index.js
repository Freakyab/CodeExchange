const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/create", require("./create"));
app.use("/get", require("./get"));

app.get("/", async (req, res) => {
  return res.status(200).send("Working");
});

app.use((req, res, next) => {
  const contentLength = req.get('content-length');
  console.log(`Request body size: ${contentLength} bytes`);
  next();
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
