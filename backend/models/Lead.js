import mongoose from "mongoose";
const leadSchema =new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    city:String,
    phone:String,
    city:String,
    Source:String,
    Status:String,
    Assigned_to:String,
    Notes:String,
    Follow_up:String,
    date_created:String,


},{timestamps:true});
export default mongoose.model("Lead",leadSchema);