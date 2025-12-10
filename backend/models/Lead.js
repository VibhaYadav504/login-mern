import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  address: String,
  source: String,
  status: String,
  assigned_to: String,
  notes: String,
  follow_up: String,
  date_created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Lead", leadSchema);
