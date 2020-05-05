/**
 * @module src/main.ts
 *
 * Main.ts operates as the entry point to our application.
 */
import { app } from './core';

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`✨Server running on port ${PORT} 🚀`);
});
