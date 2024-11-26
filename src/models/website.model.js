import mongoose from 'mongoose'
const websiteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    lastChecked: {
        type: Date,
        default: null
    },
    geoServer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeoServer'
    }
},{timestamps: true})