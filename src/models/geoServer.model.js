const geoServerSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },
    lastHeartbeat: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GeoServer", geoServerSchema);
