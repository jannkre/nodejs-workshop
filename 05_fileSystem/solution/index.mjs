import fetch from "node-fetch";
import downloadImage from "./lib/fileHandling.mjs";
import { resizeImage } from "./lib/fileHandling.mjs";

const resp = await fetch("https://api.sampleapis.com/presidents/presidents");
const json = await resp.json();

json.forEach(async (president) => {
  await downloadImage(president.photo, process.env.NODE_ENV === "production" ? `./files/production/${president.id}.jpg` : `./files/development/${president.id}.jpg` );
  try {
    await resizeImage(process.env.NODE_ENV === "production" ? `./files/production/${president.id}.jpg` : `./files/development/${president.id}.jpg`, 100, 100);
  } catch (error) {
    console.error(error);
  }
});