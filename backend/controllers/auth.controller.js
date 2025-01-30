import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const verificationToken = generateVerificationToken();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            resetPasswordTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();
        // jwt
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken)
        res.status(201).json({
            message: "User created successfully",
            user: { ...user._doc, password: undefined }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
export const login = async (req, res) => {
    res.json({ message: "Login route" })
}
export const logout = async (req, res) => {
    res.json({ message: "Logout route" })
}
