const mongoose = require('mongoose')
const colors = require("colors")

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB running")
    } catch (error) {
        console.log("Error")
    }
}

module.exports = connectDb;