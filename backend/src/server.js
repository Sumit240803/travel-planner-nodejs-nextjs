const app = require("./app");
require("dotenv").config();
const PORT =process.env.PORT || 5000 ;
const connectDb = require("./config/db");
connectDb();
app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`);
})