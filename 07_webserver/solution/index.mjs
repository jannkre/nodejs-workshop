import http from "http";
import fetch from "node-fetch";
import { writeFile } from 'fs/promises';
import { join } from 'path';

const server = http.createServer(async (req, res) => {
  console.log(`New request received: ${req.method} ${req.url}`);
  
  if (req.url === "/") {
    res.end("Hello World");
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
      res.end("Hello World 2");
    }
  } else {
    res.end("Not found");
  }
  
  console.log(`Request handled: ${req.method} ${req.url}`);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("\nTo send an image, use:");
  console.log('curl -X POST http://localhost:3000/api/presidents \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d "{\\"image\\": \\"$(base64 -i path/to/your/image.jpg)\\"}"');
});