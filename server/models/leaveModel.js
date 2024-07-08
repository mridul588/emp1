import mongoose from 'mongoose';

const { Schema } = mongoose;

const leaveSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    purpose: { type: String, required: true },
    status: { type: Number, required: true, enum: [0, 1, 2], default: 1 }, // 0 = Rejected, 1 = Pending, 2 = Granted
    email: { type: String, required: true },
    requestDate: { type: Date, default: Date.now } // Add this line
});

const leaveModel = mongoose.model('Leave', leaveSchema);

export default leaveModel;
