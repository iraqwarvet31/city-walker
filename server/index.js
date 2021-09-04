const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();
// const CLIENT_DIR = path.resolve(__dirname, "..", "client", "dist");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});