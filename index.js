const express = require('express');
const app = express();
const PORT = 3000;
const issueRouter = require('./routes/issues');

app.use(express.json());

app.use("/api", issueRouter);

app.listen(PORT, ()=> {
    console.log(`Listening on Port : ${PORT}`);
})