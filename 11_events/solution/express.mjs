import express from 'express';
import { appendFile } from 'fs/promises';
import { join } from 'path';

const app = express();
const port = 3000;
const LOG_FILE = join(process.cwd(), 'app.log');

// Middleware to parse JSON bodies
app.use(express.json());

// Route to write to log file
app.post('/log', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ 
                error: 'Message is required' 
            });
        }

        // Append the message to the log file with timestamp
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        
        await appendFile(LOG_FILE, logEntry);
        
        res.json({ 
            success: true, 
            message: 'Log entry added successfully',
            timestamp
        });
    } catch (error) {
        console.error('Error writing to log file:', error);
        res.status(500).json({ 
            error: 'Failed to write to log file' 
        });
    }
});

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
}); 