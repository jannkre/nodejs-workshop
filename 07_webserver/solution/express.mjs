import express from 'express';
import fetch from "node-fetch";
import { writeFile, statfs } from 'fs/promises';
import { join } from 'path';
import filterByName from "./lib/filterAPIResponse.mjs";

const app = express();
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Root endpoint
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Get president image
app.get('/api/presidents/image', async (req, res) => {
  try {
    const { id } = req.query;
    const filePath = join(process.cwd(), 'files', `president_${id}.jpg`);
    
    const imageBuffer = await readFile(filePath);
    res.type('image/jpeg').send(imageBuffer);
  } catch (error) {
    res.status(404).json({ error: 'Image not found' });
  }
});

// Presidents endpoints
app.route('/api/presidents')
  // Get presidents with optional search
  .get(async (req, res) => {
    try {
      const { search } = req.query;
      let presidents = await (await fetch("https://api.sampleapis.com/presidents/presidents")).json();
      
      if (search) {
        presidents = filterByName(presidents, search);
      }

      // Add photo URLs to presidents
      presidents = await Promise.all(presidents.map(async (president) => {
        try {
          await statfs(join(process.cwd(), 'files', `president_${president.id}.jpg`));
          president.photo = `http://localhost:3000/api/presidents/image?id=${president.id}`;
        } catch (error) {
          // Image doesn't exist, no photo URL added
        }
        return president;
      }));

      res.json(presidents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch presidents' });
    }
  })
  // Upload president image
  .post(async (req, res) => {
    try {
      const { image, id } = req.body;
      
      if (!image || !id) {
        return res.status(400).json({ error: 'Missing image or id' });
      }

      const imageBuffer = Buffer.from(image, 'base64');
      const fileName = `president_${id}.jpg`;
      const filePath = join(process.cwd(), 'files', fileName);
      
      await writeFile(filePath, imageBuffer);
      console.log(`Image saved to ${filePath}`);
      
      res.json({ 
        message: 'Image received successfully',
        imageSize: image.length
      });
    } catch (error) {
      res.status(400).json({ error: 'Invalid request data' });
    }
  });

// 404 handler
app.use((req, res) => {
  res.status(404).send("Not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});