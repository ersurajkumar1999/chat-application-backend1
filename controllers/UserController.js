const { Userlist, TotalUsers } = require("../services/UserService");

exports.getUserList = async(req, res) =>{

    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;

    const skip = (page - 1) * pageSize;
    try {
        const totalUsers = await TotalUsers();
        const users = await Userlist(skip, pageSize);
        res.json({
            users,
            page,
            pageSize,
            totalUsers,
            totalPages: Math.ceil(totalUsers / pageSize),
            status: true,
            message: "all users"
        });
    } catch (err) {
        res.status(500).json({ error: err.message, status: false, message: "Something went wrong, Please trye again!" });
    }
}