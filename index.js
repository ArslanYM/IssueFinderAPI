const express = require('express');
const app = express();
var cors = require('cors');
const PORT = 3000;
const issueRouter = require('./routes/issues');

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/README.md")
})
app.use("/api", issueRouter);



app.listen(PORT, ()=> {
    console.log(`Listening on Port : ${PORT}`);
})