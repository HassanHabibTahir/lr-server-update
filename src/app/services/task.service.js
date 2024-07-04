const { Task } = require("../Models");

const checkProjectExist = async (id) => {
  const projectExist = await Task.findById(id);
  return projectExist;
};

// add Task
const addTask = async (projectData) => {
  const newTask = await Task.create(projectData);
  return newTask;
};

// Assign Task to Developer
const assignTask = async (taskId, developerId) => {
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { assignedTo: developerId },
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    return { error: `Task with ID ${taskId} not found` };
  }
  return updatedTask;
};
// Update Task Progress
const updateProgress = async (taskId, progress) => {
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { progress: progress },
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    return { error: `Task with ID ${taskId} not found` };
  }
  return updatedTask;
};

// Update Task Estimation
const updateEstimation = async (taskId, estimation) => {
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { estimation: estimation },
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    return { error: `Task with ID ${taskId} not found` };
  }
  return updatedTask;
};
// Update Task details
const updateTask = async (taskId, taskData) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
    new: true,
  });
  if (!updatedTask) {
    return { error: `Project with ID ${taskId} not found` };
  }
  return updatedTask;
};


// delete Task
const deleteTask = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    return { error: `Project with ID ${taskId} not found` };
  }
  return deletedTask;
};

// get Tasks
const getAllTasks = async () => {

  const tasks = await Task.find({}).populate([
    { path: 'projectId', select: 'title description' },
    { path: 'assignedTo', select: 'firstName lastName email' }
  ]);;
  return tasks;
};


//get task by id

const getTaskById = async (id) => {
  const task = await Task.findById(id).populate([
    { path: 'projectId', select: 'title description' },
    { path: 'assignedTo', select: 'firstName lastName email' }
  ]);
  return task;
};



module.exports = {
  checkProjectExist,
  addTask,
  assignTask,
  updateProgress,
  updateEstimation,
  deleteTask,
  updateTask,
  getAllTasks,
  getTaskById
};
