const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Error", "Warning", "Info"],
      default: "Info",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
