const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      enum: [
        "pending",
        "in_progress",
        "on_hold",
        "completed",
        "canceled",
        "Closed",
      ],
      default: "To Do",
    },

    estimation: Number,
    progress: Number,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    files: [
      {
        name: {
          type: String,
        },
        path: {
          type: String,
        },
        type: {
          type: String,
        },
        size: {
          type: Number,
        },
      },
    ],
    logs: [
      {
        oldStatus: {
          type: String,
          required: true,
        },
        newStatus: {
          type: String,
          enum: [
            "pending",
            "in_progress",
            "on_hold",
            "completed",
            "canceled",
            "Closed",
          ],
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        logMessage: {
          type: String,
        },
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
