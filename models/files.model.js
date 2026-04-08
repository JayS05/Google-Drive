const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true }, // The path in Supabase bucket
    originalname: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true });

module.exports = mongoose.model('file', fileSchema);