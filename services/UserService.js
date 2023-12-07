const userModel = require("../models/User");

exports.findUserByEmail = async (email) => {
    return await userModel.findOne({ email: email });
}

exports.findUserByUserName = async (username) => {
    return await userModel.findOne({ username: username });
}

exports.findUserById = async (userId) => {
    return await userModel.findOne({ _id: userId });
}
exports.createUser = async (userInfo) => {
    return await userModel.create(userInfo);
}

exports.Userlist = async (skip, pageSize) => {
    return await userModel.find().skip(skip).limit(pageSize).exec();
}

exports.TotalUsers = async () => {
    return await userModel.countDocuments();
}