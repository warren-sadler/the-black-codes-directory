/**
 * @module core.app
 *
 * This module defines the core Express application routers, middleware, and
 * instance generation.
 */

import express from 'express';

export const app = express();
app.use('/', (req, res) => {
    res.status(200).json('Hello from The Black Codes');
});
