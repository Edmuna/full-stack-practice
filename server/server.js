const express = require("express")
const cors = require("cors")
const fs = require("fs")


const app = express()
app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log("Server started")
})

app.get("/", cors(), (req, res) => {
    fs.readFile("data.json", (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const jsonData = JSON.parse(data)
            res.status(200).json(jsonData)
        }
    })
})

app.post("/post", (req, res) => {
    const data = req.body;
    console.log("Received data:", data);

    fs.writeFile("data.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error writing to json" });
        } else {
            console.log("Data written to json");
            res.status(200).json({ message: "Data written to json" });
        }
    });
});


app.post("/dino", (req, res) => {
    res.status(200).json({ message: "POST method succesfull" })
})