import express from 'express';
import cors from 'cors';

const app = express();

const configurationCors = {
    origin : process.env.CORS_ORIGIN,
    methods : 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    credentials: true
};

app.use(cors(configurationCors));

export {app};