const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = express()

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)


// database connection
mongoose.connect(
  process.env.MONGO_URL,
).then(()=>{
    console.log('connected to database');
}).catch((err) => {
    console.log(err.message)
})



const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})