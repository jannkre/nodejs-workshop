import fetch from "node-fetch";
import fs from "fs";

await fetch("http://localhost:3000/president/image?id=1", {
    method: "PUT",
    body: fs.readFileSync("./example.png")
});