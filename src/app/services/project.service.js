// services/projectService.js
const { Comments } = require('../Models');
const Project = require('../Models/project');



// Create a new project
const addProject = async (projectData) => {
  const newProject = await Project.create(projectData);
  return newProject;
};


const assignProject = async (projectId, developerId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    return { error: `Task with ID ${projectId} not found` };
  }
  
  const checkUser = await Project.findOne({
    _id: projectId,
    assignedTo: { $in: developerId },
  });
  if (checkUser) {
    return { error: `User with ID ${developerId} is already assigned to this project` };
  }
  project.assignedTo.push(developerId);
  const updatedProject = await project.save();
  return updatedProject;
};

// Retrieve all projects
const getAllProjects = async () => {
 
  const projects = await Project.find({})
  .populate([
    { path: "assignTo",select: "userName email firstName lastName"},
    { path: "comments", select: "text author createdAt" },
  ]);



  return projects;
};
const getProjectById = async (id) => {

  const projects = await Project.findById(id)
  .populate([
    { path: "assignTo",select: "userName email firstName lastName"},
    { path: "comments", select: "text author createdAt" },
  ]);
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

//add comments
const addComment = async (projectId, _comment) => { 
  const comment = new Comments(_comment);
  await comment.save();
  const project = await Project.findById(projectId);
    project?.comments?.push(comment?._id);
  await project.save();
  return project;
};


module.exports = {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addComment,
  assignProject
};
