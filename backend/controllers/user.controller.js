import { User } from "../models/user.model.js";

/**
 * @desc Get current user details
 * @route GET /api/users/me
 * @access Private (Authenticated users)
 */
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

/**
 * @desc Update user details
 * @route PUT /api/users/me
 * @access Private (Authenticated users)
 */
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            message: "User profile updated successfully",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user profile" });
    }
};

/**
 * @desc Delete user account
 * @route DELETE /api/users/me
 * @access Private (Authenticated users)
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.deleteOne({ _id: req.user._id });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
