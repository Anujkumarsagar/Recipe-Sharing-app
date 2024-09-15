const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./config/database");

const {cloudinaryConnect} = require("./config/cloudinary");

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

connect();
cloudinaryConnect();


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
