const { findUserById } = require("../services/UserService");

exports.getAdminProfile = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token!"
        })
    }
    try {
        
        const user = await findUserById(req.user.id);

        res.json({ data: user, status: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}