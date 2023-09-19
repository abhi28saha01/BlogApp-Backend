const express = require('express');
const app = express();

require('dotenv').config();

//Add MiddleWare
app.use(express.json());

const port = process.env.PORT || 9000;
app.listen(port,() => {
    console.log(`Server Started at Port : ${port}`);
})

const router = require('./Routes/Route');
app.use("/api/v1",router);

require('./Config/database').DBConnect();