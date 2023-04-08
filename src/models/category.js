import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 3,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
