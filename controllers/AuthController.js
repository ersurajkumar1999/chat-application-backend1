const jwt = require("jsonwebtoken");

const { comparePassword, hashedPassword } = require("../helper/PasswordManager");
const { findUserByEmail, createUser } = require("../services/UserService");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.UserRegister = async (req, res) => {

    try {
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(409).json({
                status: false,
                errors,
                message: "Please check Validation",
            });
        }

        const { name, email, password, password2 } = req.body;
        const checkUserExists = await findUserByEmail(email);
        if (checkUserExists) {
            return res.status(409).json({

                status: false,
                message: "User email already exists",
            });
        }
        const parts = email.split('@');
        const username = parts[0];
        const userInfo = {
            name: name,
            email: email,
            username: username,
            password: await hashedPassword(password)
        }
        const user = await createUser(userInfo)
        res.json({
            data: user,
            status: true,
            message: "User registered successfully!",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.UserLogin = async (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(409).json({
            status: false,
            errors,
            message: "Please check Validation",
        });
    }

    // Check if User Exists or Not
    const checkUserExists = await findUserByEmail(req.body.email);
    if (!checkUserExists) {
        return res.status(401).json({
            success: false,
            message: "User is not registered, Please signup first"
        })
    }

    const checkPassword = await comparePassword(req.body.password, checkUserExists.password);
    if (!checkPassword) {
        return res.status(400).json({
            success: false,
            message: "Incorrect Password"
        })
    }
    const token = jwt.sign(
        {
            email: checkUserExists.email, id: checkUserExists._id, userType: checkUserExists.userType
        },
        process.env.JWT_SECRET,
        {
        }
    );
    checkUserExists.token = "Bearer " + token;
    // let userWithProfile = await Profile.findOne({ "_id": "653cc3a59af3a6ea090cb819" }).populate("userId")
    // let userWithProfile = await User.aggregate([
    //     {
    //         $match: {
    //             "_id": checkUserExists._id
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "profiles",
    //             localField : "_id",
    //             foreignField: "userId",
    //             as: "userProfiles"
    //         }
    //     }
    // ])
    // const p = await userProfileService.getProfileByUserId(checkUserExists._id);
    // checkUserExists.profile = p;
    return res.status(200).json({ data: checkUserExists, status: true, message: "Login successfully!" });
}