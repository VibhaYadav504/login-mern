const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    email:String,
    Password:String,
});
module.exports=mongoose.model("Admin",adminSchema);