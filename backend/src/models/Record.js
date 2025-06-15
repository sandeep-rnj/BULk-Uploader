import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
  status: { type: String, enum: ['SUCCESS', 'FAILED'], default: 'SUCCESS' },
  error: String
}, { timestamps: true });

export default mongoose.model('Record', recordSchema);
