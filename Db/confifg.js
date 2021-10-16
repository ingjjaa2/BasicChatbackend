const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_URI);  
        
        console.log("DB ONLINE");

    } catch (error) {
        console.log(error);
        throw new Error("Error in DB Connection");
    }


}


module.exports = {dbConnection};