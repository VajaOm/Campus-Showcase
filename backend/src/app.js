import express from 'express';
import cors from 'cors';

const app = express();

const configurationCors = {
    origin : process.env.CORS_ORIGIN,
    methods : 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    credentials: true
};

app.use(cors(configurationCors));

//to get the data as json formate
app.use(express.json(  {limit : '16kb'}  ));

//to get data from url 
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// to store files in the public folder such as pdf, photos, etc.
app.use(express.static("public"));

export {app};