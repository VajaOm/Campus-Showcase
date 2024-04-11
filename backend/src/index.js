import connectionDB from './db/index.js';
import { app } from './app.js';
import dotenv from 'dotenv';


dotenv.config({path: './env'});

connectionDB()
.then(()=> {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port ${process.env.PORT || 5000}`)
    })
})
.catch((err) => {
    console.log("Mongodb connection failed : ",err);
})


