import http from "http";
import fetch from "node-fetch";
import { writeFile, statfs} from 'fs/promises';
import { join } from 'path';
import filterByName from "./lib/filterAPIResponse.mjs";

const server = http.createServer(async (req, res) => {
  console.log(`New request received: ${req.method} ${req.url}`);
  
  if (req.url === "/") {
    res.end("Hello World");
  }
  else if (req.url === "/api/presidents/image") {
    if (req.method === 'GET') {
      const query = req.url.split("?")[1];
      const id = query.split("=")[1];
      const filePath = join(process.cwd(), 'files', `president_${id}.jpg`);
      
      try {
        const imageBuffer = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(imageBuffer);
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Image not found' }));
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
  }
  else if (req.url === "/api/presidents") {
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);

          const imageBuffer = Buffer.from(data.image, 'base64');
          const fileName = `president_${data.id}.jpg`;
          const filePath = join(process.cwd(), 'files', fileName);
          
          await writeFile(filePath, imageBuffer);
          console.log(`Image saved to ${filePath}`);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            message: 'Image received successfully',
            imageSize: data.image.length
          }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON or missing image data' }));
        }
      });
    } else {
      let query = req.url.split("?")[1];
      let searchQuery = query.split("=")[1];

      let presidents = await (await fetch("https://api.sampleapis.com/presidents/presidents")).json();
      presidents = filterByName(presidents, searchQuery);

      presidents = await Promise.all(presidents.map(async (president) => {
        try {
          await statfs(join(process.cwd(), 'files', `president_${president.id}.jpg`));
          president.photo = "http://localhost:3000/api/presidents/image?id=" + president.id;
        } catch (error) {
          // If file doesn't exist, president.photo will remain undefined
        }
        return president;
      }));

      res.end(JSON.stringify(presidents));
    }
  } else {
    res.end("Not found");
  }
  
  console.log(`Request handled: ${req.method} ${req.url}`);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});