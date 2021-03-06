var mongoose = require('mongoose');

var hitSchema = new mongoose.Schema({
  timestamp: { type: Date , default: Date.now},
  details: {
    value: { type: Number, default: '' },
    description: { type: String, default: '' }
  },
  user: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Hit', hitSchema);
