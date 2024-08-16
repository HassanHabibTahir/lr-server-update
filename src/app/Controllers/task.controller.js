const httpStatus = require("http-status");
const { taskService } = require("../services");
const { Roles } = require("../../helpers/roles");
const { Task } = require("../Models");
const { default: mongoose } = require("mongoose");
const { getStoragePath } = require("../../helpers/storageUtil");

exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    let projectFiles = [];
    if (req.files && req.files.files) {
      let files = req.files.files;
      if (!Array.isArray(files)) {
        files = [files];
      }
      projectFiles = await Promise.all(
        files.map(async (file) => {
          const storagePath = getStoragePath(file);
          await file.mv(storagePath);
          return {
            name: file.name,
            path: file.name,
            size: file.size,
            type: file.mimetype,
          };
        })
      );
    }
    if (projectFiles.length > 0) {
      taskData.files = projectFiles;
    }

    const task = await taskService.addTask(taskData);
    res.status(httpStatus.CREATED).send(task);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
exports.addTaskFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const Files = req.files.files;
    if (req.files && req.files.files) {
      let files = req.files.files;
      if (!Array.isArray(Files)) {
        files = [Files];
      }
      taskFiles = await Promise.all(
        files.map(async (file) => {
          const storagePath = getStoragePath(file);
          await file.mv(storagePath);
          return {
            name: file.name,
            path: file.name,
            size: file.size,
            type: file.mimetype,
          };
        })
      );
    }

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $push: { files: { $each: taskFiles } } },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res.status(httpStatus.OK).json(updatedTask);
  } catch (error) {
    console.error(`Catch Error: in addTaskFiles => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to add Task files", error: error.message });
  }
};
// assign tasks
exports.assignTask = async (req, res) => {
  try {
    const task = await taskService.assignTask(
      req?.params?.id,
      req?.body?.assignedTo
    );
    if (task.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: task.error });
    }
    res.status(200).json(task);  
  } catch (error) {
    res.status(400).send(error);
  }
};

// update progress
exports.updateProgress = async (req, res) => {
  try {
    const task = await taskService.updateProgress(
      req?.params?.id,
      req?.body?.progress
    );
    if (task.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: task.error });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.tokenData;
    const { status } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const oldStatus = task.status;
    task.status = status;
    const logEntry = {
      oldStatus: oldStatus,
      newStatus: status,
      userId: user?.userId,
      timestamp: new Date(),
      logMessage: `Status updated from ${oldStatus} to ${status}`,
    };
    task.logs.push(logEntry);
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update estimation
exports.updateEstimation = async (req, res) => {
  try {
    const task = await taskService.updateEstimation(
      req.params.id,
      req.body.estimation
    );
    if (task.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: task.error });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
// update task
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (task.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: task.error });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    if (task.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: task.error });
    }
    res.send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const task = await taskService.getAllTasks();
    if (!task) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.addComment = async (req, res) => {
  try {
    const user = await req.tokenData;
    const task = await taskService.getTaskById(req.params.id);
    if (!task)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found!" });

    const assignTo = await taskService.checkTaskWithToAssigned(
      user?.userId,
      req.params.id
    );
    if (!assignTo) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Task not assigned to you!" });
    }

    const comment = await taskService.addComment(req?.params?.id, {
      text: req?.body?.text,
      commentBy: user?._id,
    });

    if (!comment) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    return res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};
