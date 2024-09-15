const dotenv = require("dotenv")
const User = require("../models/User")


dotenv.config();

exports.auth = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.header("Authorization").replace("Bearer", "");

        //check token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Token Missing`,
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decode);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })

        }

        next();



    } catch (error) {

        return res.status(401).json({
            success: false,
            error: error.messsage,
        })

    }
}


exports.isCreator = async(erq, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.accountType != "creator") {
            return res.status(401).json({
                success: false,
                message: "Only creators can access this route"
            })
        }

        next();


    } catch (error) {

        return res.status(401).json({
            success: false,
            error: error.messsage,
        })

    }
}