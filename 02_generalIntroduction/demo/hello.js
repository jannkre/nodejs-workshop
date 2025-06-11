console.log(process);

let db_host = "localhost";
let db_user = "admin";

if (process.env.NODE_ENV === "production") {
    db_host = "prod.db.com";
}


let name = "John";
let occupation = "Software Engineer";
let age = 30;

name = process.argv[2];


if (!name) {
    console.log("Please provide a name");
    process.exit(0);
}

function addSurname(surname) {
    name = `${name} ${surname}`;
}

if (age > 18) {
    console.log(`${name} is an adult`);
} else {
    console.log(`${name} is a minor`);
}

console.log(`${name} is ${age} years old and works as a ${occupation}`);