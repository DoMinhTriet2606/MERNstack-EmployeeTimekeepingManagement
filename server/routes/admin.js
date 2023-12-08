const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const verifyToken = require("../middleware/auth");

const Info = require("../models/Info");
const User = require("../models/User");
const ShiftAdmin = require("../models/ShiftAdmin");
const Salary = require("../models/Salary");

// Get all users
router.get("/users", verifyToken, async (req, res) => {
    try {
        const users = await Info.find().sort({ firstName: 1 });
        res.json({ success: true, users: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get all users salary
router.get("/users/salary", verifyToken, async (req, res) => {
    if (req.userType !== "Manager") {
        return res.status(403).json({ success: false, message: "Permission denied" });
    } else {
        try {
            const salaries = await Salary.find();
            res.json({ success: true, salaries: salaries });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
});

// Get User's info
router.get("/user/:id", verifyToken, async (req, res) => {
    try {
        const user = await Info.find({ user: { $eq: req.params.id } });
        res.json({ success: true, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route GET api/admin/get-user-info/:username
// @desc Get user information by admin
// @access private (admin)
router.get("/user-account/:username", verifyToken, async (req, res) => {
    // Check if the requesting user is an admin
    if (req.userType !== "Manager") {
        return res.status(403).json({ success: false, message: "Permission denied" });
    }

    const { username } = req.params;

    try {
        // Find user by username
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get all shifts
router.get("/shifts", async (req, res) => {
    try {
        const shiftAdmin = await ShiftAdmin.find().populate("user", ["username", "userType"]);
        res.json({ success: true, shiftAdmin: shiftAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// delete shift
router.put("/shift/:id", async (req, res) => {
    const { shiftTime } = req.body;

    if (!shiftTime) {
        return res.status(404).json({ success: false, message: "No Shift Time" });
    }

    const shiftTest = await ShiftAdmin.findOne({ _id: req.params.id }).populate("user", "username");
    for (let i = 0; i < shiftTest.shifts.length; i++) {
        if (shiftTest.shifts[i].shiftTime === shiftTime) {
            let spliced = shiftTest.shifts.splice(i, 1);
        }
    }
    console.log(shiftTest.shifts, shiftTime);
    try {
        let updatedShift = { shiftQuantity: shiftTest.shifts.length, shifts: shiftTest.shifts };
        const shiftUpdateCondition = { _id: req.params.id };
        updatedShift = await ShiftAdmin.findOneAndUpdate(shiftUpdateCondition, updatedShift, {
            new: true,
        }).populate("user", "username userType");

        if (!updatedShift) {
            return res.status(401).json({
                success: false,
                message: "Shift not found",
                test: shiftUpdateCondition,
            });
        }
        res.json({ success: true, message: "Admin Shift updated!", shift: updatedShift });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route PUT api/admin/change-user-password/:userId
// @desc Change user password by admin
// @access private (admin)
router.put("/change-user-password/:userId", verifyToken, async (req, res) => {
    // Check if the requesting user is an admin
    if (req.userType !== "Manager") {
        return res.status(403).json({ success: false, message: "Permission denied" });
    }

    const { userId } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    // Simple validation
    if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Get user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New passwords do not match" });
        }

        // Hash the new password
        const hashedNewPassword = await argon2.hash(newPassword);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.json({
            success: true,
            message: "User password changed successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
