const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')
//config dot env file
dotenv.config();

//Database call
connectDb()

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//User routes
app.use('/api/v1/users', require('./routes/userRoute'))
//Transection routes
app.use('/api/v1/transections', require('./routes/transectionRoute'))

//port
const port = 8080 || process.env.port;

//listen server
app.listen(port, () => {
    console.log("server running on port", port);
});
