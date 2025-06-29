import fetch from "node-fetch";
import filterByName from "./lib/filterAPIResponse.mjs";
import { DEFAULT_SEARCH_TERM } from "./lib/constants.mjs";


const resp = await fetch("https://api.sampleapis.com/presidents/presidents");

console.log(resp.ok);
console.log(resp.status);
console.log(await resp.arrayBuffer())
process.exit(0);

const buffer = Buffer.from(await resp.arrayBuffer());
// writeFileSync("./presidents.json", buffer);


// const resp2 = await fetch("https://api.sampleapis.com/presidents/presidents/lincoln.png");
// const blob = await resp2.arrayBuffer();
// const buffer = Buffer.from(blob);

if (process.argv[2] === undefined) {
    console.log(filterByName(json, DEFAULT_SEARCH_TERM));
} else {
    console.log(filterByName(json, process.argv[2]));
}