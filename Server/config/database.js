const mongoose = require("mongoose");

const connectDB = async () => {

    await mongoose.connect(process.env.DB_LOCAL_URI);
    
};

module.exports = connectDB;
