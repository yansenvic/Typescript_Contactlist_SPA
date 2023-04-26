const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/*", (req : any,res : any) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(port,()=>{
    console.log("Running on port ", + port)
})