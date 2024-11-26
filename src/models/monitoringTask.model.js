const monitoringTaskSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    interval: {
      type: Number,
      required: true,
      default: 5, // in minutes
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lastChecked: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    isUp:{
      type: Boolean,
      default: false,
    }
    // failoverServers: [
    //   {
    //     serverId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "GeoServer",
    //     },
    //     isPrimary: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("MonitoringTask", monitoringTaskSchema);
