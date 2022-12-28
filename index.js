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


app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})