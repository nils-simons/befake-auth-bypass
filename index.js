const cors = require("cors");
const express = require("express");

const app = express();
exports.app = app;

app.use(cors());
app.use(express.json());

const PORT = 7630;

require('./api/login')
require('./api/post')

app.listen(PORT, () => {
    console.log(`BeFake API *:${PORT}`);
});
