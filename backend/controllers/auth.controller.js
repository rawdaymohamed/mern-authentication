import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

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
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
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
        res.status(500).json({ message: error.message })
    }

}
export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(200).json({ message: "User is already verified" });
        }
        if (user.verificationToken !== code || user.verificationTokenExpiresAt <= Date.now()) {
            return res.status(400).json({ message: "Invalid or expired authentication token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({
            message: "Email verified successfully",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while verifying email" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        return res.status(200).json({
            message: "User logged in successfully",
            user: { ...user._doc, password: undefined }
        })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to log in" });

    }
}
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Logout route" })
}