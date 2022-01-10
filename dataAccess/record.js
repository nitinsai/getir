const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({}, { strict: false });
const Record = mongoose.model('records', recordSchema);

module.exports = Record ;