const mongoose = require('mongoose');

const factSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fact: String,
    source: String,
});

module.exports = mongoose.model('Fact', factSchema);
