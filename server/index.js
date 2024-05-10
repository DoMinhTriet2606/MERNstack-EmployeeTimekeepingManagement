require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userInfoRouter = require("./routes/info");
const salaryRouter = require("./routes/salary");
const adminRouter = require("./routes/admin");
const userShiftRouter = require("./routes/shiftUser");
const cors = require("cors");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.n3y93ea.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userInfoRouter, userShiftRouter, salaryRouter);
app.use("/api/admin", adminRouter);

app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
