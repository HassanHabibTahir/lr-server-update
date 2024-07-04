const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  status: String,
  estimation: Number,
  progress: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
}

);

module.exports = mongoose.model('Task', taskSchema);
