const cors = require("cors");
const express = require("express");

const app = express();
exports.app = app;

app.use(cors());
app.use(express.json());

const PORT = 7630;

app.listen(PORT, () => {
    console.log(`API Started on *:${PORT}`);
});
