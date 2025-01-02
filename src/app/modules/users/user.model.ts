import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name.'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide email address.'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password.']
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: '{VALUE} is not valid. Please provide a valid type.',
        },
        required: [true, 'Please provide a role.'],
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

export default User;