let a = 1;

let validateInput = (input) => {
  if (input.length === 0) {
    console.log("No input provided");
    return false;
  }
  return true;
};

if (process.env.NODE_ENV === "dev") {
  console.log("development", validateInput(process.argv.slice(2)));
} else {
  console.log("production");
}