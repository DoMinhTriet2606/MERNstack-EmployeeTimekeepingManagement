const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Salary = require("../models/Salary");
const User = require("../models/User");

// @route GET api/salary/user/:userId
// @desc Get salary information by user ID
// @access private (requires authentication and manager role)
router.get("/salary/:userId", verifyToken, async (req, res) => {
    try {
        // Check if the authenticated user ID matches the requested user ID
        if (req.userId !== req.params.userId) {
            // If not, check if the user has a "manager" role
            const authenticatedUser = await User.findById(req.userId);

            if (!authenticatedUser || authenticatedUser.userType !== "Manager") {
                return res.status(403).json({ success: false, message: "Unauthorized access" });
            }
        }

        // Find the salary records for the specified user ID
        const salaries = await Salary.find({ user: req.params.userId }).populate("user", [
            "username",
            "userType",
        ]);

        if (!salaries || salaries.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No salary information found for the user" });
        }

        res.json({ success: true, salaries: salaries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route POST api/salary/create
// @desc Create base salary data for a user
// @access private (requires authentication)
router.post("/salary/create", verifyToken, async (req, res) => {
    try {
        // Check if the authenticated user ID matches the requested user ID
        if (req.userId !== req.body.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        // Check if the user already has a salary record
        const existingSalary = await Salary.findOne({ user: req.userId });
        if (existingSalary) {
            return res
                .status(400)
                .json({ success: false, message: "Salary data already exists for the user" });
        }

        // Create a new salary record
        const newSalary = new Salary({
            timekeeper: [], // You can add initial timekeeper data if needed
            totalEarnings: 0, // Set initial total earnings
            monthlyEarnings: 0, // Set initial monthly earnings
            user: req.userId,
        });

        // Save the new salary record
        await newSalary.save();

        res.json({
            success: true,
            message: "Base salary data created successfully",
            salary: newSalary,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route PUT api/salary/update
// @desc Update salary data for a user
// @access private (requires authentication, admin, or manager role)
router.put("/salary/update", verifyToken, async (req, res) => {
    try {
        // Check if the authenticated user ID matches the requested user ID
        if (req.userId !== req.body.userId) {
            // If not, check if the user has a "manager" role
            const authenticatedUser = await User.findById(req.userId);

            if (!authenticatedUser || authenticatedUser.userType !== "Manager") {
                return res.status(403).json({ success: false, message: "Unauthorized access" });
            }
        }

        // Check if the user has an existing salary record
        const existingSalary = await Salary.findOne({ user: req.body.userId });
        if (!existingSalary) {
            return res
                .status(404)
                .json({ success: false, message: "Salary data not found for the user" });
        }

        // Update the timekeeper array (add more data if needed)
        existingSalary.timekeeper.push(req.body.newTimekeeper);

        // Increase totalEarnings and monthlyEarnings based on the new data
        const { newEarnings } = req.body;
        existingSalary.totalEarnings += newEarnings;
        existingSalary.monthlyEarnings += newEarnings;

        // Save the updated salary record
        await existingSalary.save();

        res.json({
            success: true,
            message: "Salary data updated successfully",
            salary: existingSalary,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
