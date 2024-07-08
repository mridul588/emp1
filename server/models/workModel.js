import mongoose from 'mongoose';

const { Schema } = mongoose;

const workSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: Number, required: true, enum: [0, 1, 2], default: 1 }, // 0 = Incomplete, 1 = In Progress, 2 = Completed
    assignedDate: { type: Date, default: Date.now }
});

const workModel = mongoose.model('Work', workSchema);

export default workModel;
