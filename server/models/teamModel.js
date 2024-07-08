import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamSchema = new Schema({
    name: { type: String, unique: true, required: true },
    lead: { type: Schema.Types.ObjectId, ref: 'User' },
});

const teamModel = mongoose.model('Team', teamSchema);

export default teamModel;
