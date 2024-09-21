const dotenv = require("dotenv")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);
        console.log("Authorization header:", req.header("Authorization"));

        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer", "").trim();

        console.log("Extracted token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;

        console.log(req.user);

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication Failed",

        });
    }
};


exports.isCreator = async (req, res, next) => {
    try {
        console.log("User account type:", req.user);
        if (req.user.role !== "creator") {
            return res.status(403).json({
                success: false,
                message: "Only creators can access this route"
            });
        }
        next();
    } catch (error) {
        console.error("Error in isCreator middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}