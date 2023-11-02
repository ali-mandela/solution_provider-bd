import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './Config/db.js';
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'

//dotenv config
dotenv.config();

//database config
connectDB();
//rest object
const app = express();
 
// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


//routes
app.use('/api/v1/auth',authRoutes);
 


//rest api
app.get('/',(req,res)=>{
    res.send({
        message : "welcome to App"
    })

})
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} on port ${process.env.PORT}`);
})