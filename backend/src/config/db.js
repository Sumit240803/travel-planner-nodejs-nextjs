const mongoose = require("mongoose");

const connectDb = async()=>{
try {
    const conn = await mongoose.connect(process.env.DBTESTURL);
    console.log(`DB connection success ${conn.connection.host}`);
} catch (error) {
    console.log(`Error occurred ${error.message}`);
    process.exit(1);
}
};
module.exports = connectDb;