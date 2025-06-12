import fetch from "node-fetch";
import downloadImage from "./lib/fileHandling.mjs";
import { resizeImage } from "./lib/fileHandling.mjs";

const resp = await fetch("https://api.sampleapis.com/presidents/presidents");
const json = await resp.json();

let args = process.argv.slice(2);

let president = json.filter(president => president.name.includes(args[0]));

president.forEach(async (president) => {
  await downloadImage(president.photo, process.env.NODE_ENV === "production" ? `./files/production/${president.id}.jpg` : `./files/development/${president.id}.jpg` );
  try {
    await resizeImage(process.env.NODE_ENV === "production" ? `./files/production/${president.id}.jpg` : `./files/development/${president.id}.jpg`, parseInt(args[1]), parseInt(args[2]));
  } catch (error) {
    console.error(error);
  }
});