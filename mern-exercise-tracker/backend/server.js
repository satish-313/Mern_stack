const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/* middleware */
app.use(cors());
app.use(express.json());

/* mangoose setup */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true , useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

/* Route setup */
const exerciserRoute = require('./routes/exercise');
const userRoute = require('./routes/user');

app.use('/exercises', exerciserRoute);
app.use('/users',userRoute);

/* Listen */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});