const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  healthGoals: { type: String }, // Example: weight loss, muscle gain, etc.
});

module.exports = mongoose.model('User', userSchema);
