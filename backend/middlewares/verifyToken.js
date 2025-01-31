import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - no token provided" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Unauthorized - invalid token" })
        req.userId = decoded.userId;
        next()
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to verify token" });
        console.log("verifyToken", error)
    }
}   