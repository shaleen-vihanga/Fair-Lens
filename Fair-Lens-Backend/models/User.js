import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'doctor'], default: 'user' },
        specialization: { type: String, required: true },
        isBlocked: { type: Boolean, default: false },
        isEmailVerified: { type: Boolean, default: false },
        imageUrl: { type: String, required: true, default: '/default.png' },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;