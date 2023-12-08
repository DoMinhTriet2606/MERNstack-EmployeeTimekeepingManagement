const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShiftUserSchema = new Schema({
    shiftQuantity: { type: Number },
    shifts: [
        {
            shiftTime: { type: Number, require: true },
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
});

module.exports = mongoose.model("ShiftUser", ShiftUserSchema);
