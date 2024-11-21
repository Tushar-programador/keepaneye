import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
      index: true,
    },

    assignedServer: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Failed"],
      default: "Pending",
    },
    interval: { type: Number, required: true, default: 5 }, 
    lastChecked: { type: Date, default: null }, 
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

