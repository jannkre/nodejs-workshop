import fetch from "node-fetch";
import { readFile } from "fs/promises";

const resp = await fetch("http://localhost:3000/api/presidents", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 1,
        image: await readFile("./files/1.jpg", "base64")
    })
});
const json = await resp.json();

console.log(json);