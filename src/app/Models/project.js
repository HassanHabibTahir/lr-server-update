// models/project.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['In-Discussion', 'Approved', 'In-Development', 'Review', 'Completed'],
    default: 'In-Discussion'
  },
   clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
