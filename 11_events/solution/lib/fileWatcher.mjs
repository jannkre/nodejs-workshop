import { watch } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { EventEmitter } from 'events';

const LOG_FILE = join(process.cwd(), 'app.log');


class LogWatcher extends EventEmitter {
    constructor() {
        super();
        this.watchFile();
    }

    async watchFile() {
        // Create the log file if it doesn't exist
        try {
            await readFile(LOG_FILE);
        } catch (error) {
            // File doesn't exist, create it
            await writeFile(LOG_FILE, '');
        }

        // Watch the log file for changes
        watch(LOG_FILE, async (eventType) => {
            if (eventType === 'change') {
                try {
                    const content = await readFile(LOG_FILE, 'utf-8');
                    this.emit('logChange', content);
                } catch (error) {
                    this.emit('error', error);
                }
            }
        });

        console.log(`Watching log file: ${LOG_FILE}`);
    }
}

export const logWatcher = new LogWatcher(); 