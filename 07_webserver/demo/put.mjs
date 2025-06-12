import fetch from "node-fetch";
import fs from "fs";


fetch("http://localhost:3000", {
    method: "PUT",
    headers: {
        "Content-Type": "image/png"
    },
    body: fs.readFileSync("./example.png")
});