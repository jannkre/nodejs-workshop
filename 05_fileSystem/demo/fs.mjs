
import { readFile } from "fs/promises";
import { readFileSync, writeFileSync } from "fs";
// module.readFile


let data = await readFile("./fs.mjs");
console.log(data);

writeFileSync("./fs2.mjs", data);

// let fs2 = writeFileSync("./fs2.mjs", data, { encoding: "hex" });
// let data2 = readFileSync("./fs.mjs", "utf-8");


// console.log(data);

// readFile("./fs.mjs", "utf-8", (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });








