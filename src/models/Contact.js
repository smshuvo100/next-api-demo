import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/.+@.+\..+/, "Invalid email format"]
    }
},{ timestamps: true});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
