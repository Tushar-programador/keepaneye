import mongoose from "mongoose";
const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscriptionPlan: {
      type: String,
      enum: ["Free", "Basic", "Pro"],
      default: "Free",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Organization", organizationSchema);
