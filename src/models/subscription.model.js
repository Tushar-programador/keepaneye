const subscriptionSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    plan: {
      type: String,
      enum: ["Free", "Basic", "Pro"],
      default: "Free",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
