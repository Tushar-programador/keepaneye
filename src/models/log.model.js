const logSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MonitoringTask",
      required: true,
    },
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeoServer",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    statusCode: {
      type: Number,
    },
    responseTime: {
      type: Number, // in milliseconds
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);
