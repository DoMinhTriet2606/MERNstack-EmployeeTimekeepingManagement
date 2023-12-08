const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const ShiftUser = require("../models/ShiftUser");
const User = require("../models/User");
const ShiftAdmin = require("../models/ShiftAdmin");

router.get("/shifts", verifyToken, async (req, res) => {
    try {
        const shiftUser = await ShiftUser.find().populate("user", ["username", "userType"]);
        res.json({ success: true, shiftUser: shiftUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/shift/:id", verifyToken, async (req, res) => {
    if (req.userId !== req.params.id) {
        return res.status(500).json({ success: false, message: "Not authorized" });
    }
    try {
        const shift = await ShiftAdmin.find({ user: req.params.id }).populate("user", ["username"]);
        res.json({ success: true, shift: shift });
    } catch (error) {
        res.status(400).json("Fail");
    }
});

// Get user's shift
router.get("/shift", verifyToken, async (req, res) => {
    try {
        const userShift = await ShiftUser.find({ user: req.userId }).populate("user", [
            "username",
            "userType",
        ]);
        if (userShift.length > 0) {
            res.json({
                success: true,
                message: "Get user's shift successfully",
                userShift: userShift,
            });
        } else {
            res.json({ success: false, message: "Shift not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Post user's shift
router.post("/shift", verifyToken, async (req, res) => {
    const { shiftQuantity, shifts } = req.body;
    const user = await User.findById(req.userId, "username userType");

    if (shiftQuantity < 5) {
        res.status(400).json({ success: false, message: "5 shifts per week is required" });
    }

    try {
        const newShift = new ShiftUser({
            shiftQuantity: shiftQuantity,
            shifts: shifts,
            user: user,
        });
        const newShiftAdmin = new ShiftAdmin({
            shiftQuantity: shiftQuantity,
            shifts: shifts,
            user: user,
        });

        await newShift.save();
        await newShiftAdmin.save();
        res.json({
            success: true,
            message: "Shifts saved successfully",
            shiftInfo: newShift,
            shiftAdmin: newShiftAdmin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update user's shift
router.put("/shift", verifyToken, async (req, res) => {
    const { shiftQuantity, shifts } = req.body;

    if (shiftQuantity < 5) {
        res.status(400).json({ success: false, message: "5 shifts per week is required" });
    }

    try {
        const shiftUpdateCondition = { user: req.userId };
        const updatedShift = { shiftQuantity, shifts };
        const updatedShiftAdmin = { shiftQuantity, shifts };

        const userUpdateResult = await ShiftUser.updateMany(shiftUpdateCondition, updatedShift);
        const adminUpdateResult = await ShiftAdmin.updateMany(
            shiftUpdateCondition,
            updatedShiftAdmin
        );

        // Check if at least one document was updated for both user and admin
        if (userUpdateResult.nModified > 0 && adminUpdateResult.nModified > 0) {
            res.json({
                success: true,
                message: "Shifts updated for both user and admin!",
                userUpdateResult,
                adminUpdateResult,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Shift not found or user not authorized to update shift",
                test: shiftUpdateCondition,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
