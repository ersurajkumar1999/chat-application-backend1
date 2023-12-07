const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true, // Assuming username is required
    },
    email: {
        type: String,
        required: true, // Assuming email is required
    },
    password: {
        type: String, // Use String for storing passwords
        required: true, // Assuming password is required
    },
    userType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    },
    profile: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);
