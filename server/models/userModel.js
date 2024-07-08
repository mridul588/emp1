import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isLead: { type: Boolean, required: true, default: false },
    team: { type: String, enum: ['HR', 'WEB', 'ML', null], default: null },
});

// Checking if entered password by user during login is authentic
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    // Encrypt the password only if it's modified or created
    if (this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Ensure only one master admin
userSchema.pre("save", async function (next) {
    if (this.isAdmin) {
        const existingAdmin = await mongoose.models.User.findOne({ isAdmin: true });
        if (existingAdmin && existingAdmin._id.toString() !== this._id.toString()) {
            const error = new Error('There can only be one master admin.');
            return next(error);
        }
    }
    next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
