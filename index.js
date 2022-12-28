const express = require('express');
const app = express();
const PORT = 3000;
const core = require("cors")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(core())

app.get("/", core(), async (req, res) => {
    res.send("ok")
})
app.get("/test", (req, res) => {
    res.send({ status: 200, message: "ok" });
});

app.get("/time", (req, res) => {
    const currentDate = new Date();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes();
    res.send({ status: 200, message: time });
});
app.get('/hello/:username', (req, res) => {
    res.json({status:200, message: `Hello, ${req.params.username}`})
})

app.get('/search', (req, res) => {
    console.log(req.query.s)
    if(req.query.s == undefined || req.query.s == "") {
        console.log(req.query.s)
        res.json({status:500, error:true, message:"you have to provide a search" })
    } 
    else {
        res.json({status:200, message:"ok", data: req.query.s})
    }
})
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})