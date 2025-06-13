import express from "express";

let app = express();

app.use(express.json());

app.get("/user/:name", (req, res) => {
    console.log(req.query, req.params);
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});