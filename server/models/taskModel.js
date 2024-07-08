import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    checkinTime: { type: String, required: true },
    checkoutTime: { type: String, required: true },
    challenges: { type: String, required: true },
    status: { type: Number, required: true, enum: [0, 1, 2], default: 1 },
    monitoredBy: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const taskModel = mongoose.model('Task', taskSchema);

export default taskModel;
