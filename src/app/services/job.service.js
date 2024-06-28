// services/projectService.js
const Project = require('../Models/project');

// Check if a project exists by title
const checkProjectExist = async (title) => {
  const project = await Project.findOne({ title });
  return project ? true : false;
};

// Create a new project
const addProject = async (projectData) => {
  const newProject = await Project.create(projectData);
  return newProject;
};

// Retrieve all projects
const getAllProjects = async () => {
  const projects = await Project.find();
  return projects;
};

// Update project details
const updateProject = async (projectId, projectData) => {
  const updatedProject = await Project.findByIdAndUpdate(projectId, projectData, { new: true });
  return updatedProject;
};

// Delete a project
const deleteProject = async (projectId) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);
  return deletedProject;
};

module.exports = {
  checkProjectExist,
  addProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
