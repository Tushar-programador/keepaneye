import mongoose from "mongoose";
const websiteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //*Assuming User is a collection with an ObjectId field named '_id'
      required: true,
    },
    status: {
      type: String,
      enum: ["UP", "DOWN"],
      default: null,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    responseTime: {
      type: Number,
      default: 0,
    },
    lastChecked: {
      type: Date,
      default: null,
    },
    // geoServer: {                           //*Future updates
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "GeoServer",
    // },
    region: {
      type: String,
      required: true,
      enum: ["US", "Europe", "India"],
    },
  },
  { timestamps: true }
);

const websites = mongoose.model("Websites", websiteSchema);
export default websites;
