const httpStatus = require("http-status");
const { taskService } = require("../services");
const { Roles } = require("../../helpers/roles");

exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await taskService.addTask(taskData);
    res.status(httpStatus.CREATED).send(task);
  } catch (error) {
    res.status(400).send(error);
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
    res.send(task);
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
        if (user?.role !== Roles?.ADMIN && user?.role !== Roles?.SuperAdmin) {
        
        const assignTo = await taskService.checkTaskWithToAssigned(user?.userId,req.params.id);
        if (!assignTo ) {
          return res.status(httpStatus.FORBIDDEN).json({ message: "Task not assigned to you!" });
        }
      }
    const comment = await taskService.addComment(req?.params?.id, {
      text: req?.body?.text,
      taskToAssigned: task?.assignedTo?._id,
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
