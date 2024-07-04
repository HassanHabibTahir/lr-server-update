// services/projectService.js
const Project = require('../Models/project');



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
  if (!updatedProject) {
    return { error: `Project with ID ${projectId} not found` };
  }
  return updatedProject;
};

// Delete a project
const deleteProject = async (projectId) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);
  return deletedProject;
};

module.exports = {
  addProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
