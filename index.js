const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const AuthRoutes = require("./routes/AuthRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

dotenv.config();
const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthRoutes);
app.use("/admin", AdminRoutes);

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, async () => {
    console.log(`server up on port ${PORT}`);
});