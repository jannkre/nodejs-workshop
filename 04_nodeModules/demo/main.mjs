import { databaseConnectionString, establishDatabaseConnection } from "./lib.mjs";
import chalk from "chalk";


// let mainFunction = () => {
//     let prom = new Promise(async(resolve, reject) => {
//         let prom2 = await new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve("Hello World");
//             }, 10000);
//         });
//         console.log(prom2);
//         resolve("Hello World");
//         // setTimeout(() => {
//         //     resolve("Hello World");
//         // }, 10000);
//     });
//     // let data = await prom;
//     console.log(prom);
// }

// mainFunction();


const mainFunction = () => {

}

function mainFunction () {

}




(async () => {
    let prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 10000);
    });
    await prom;
    console.log(prom);
})();


console.log(chalk.red("Hello World"));