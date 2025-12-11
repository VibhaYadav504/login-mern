import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  
  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
    required: true
  },

  doj: {   
    type: Date,
    required: true
  },

  remark: {
    type: String
  },

  join_time: {
    type: String,  
    required: true
  },

  designation: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Employee", employeeSchema);
