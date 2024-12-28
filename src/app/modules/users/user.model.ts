import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

// Middleware to update 'updatedAt' field before updating a document 
userSchema.pre<IUser>("findOneAndUpdate", function (next) {
    // this.setOptions({ runValidators: true, new: true });
    // this.set({ updatedAt: new Date() });
    next();
});

const User = model<IUser>("User", userSchema);