// controllers/projectController.js
const httpStatus = require("http-status");
const projectService = require("../services/projectService");

// Check if a project exists
exports.checkProjectExist = async (req, res) => {
  try {
    const { title } = req.params;
    const projectExists = await projectService.checkProjectExist(title);
    res.status(httpStatus.OK).json({ exists: projectExists });
  } catch (error) {
    console.error(`Catch Error: in checkProjectExist => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: "Failed to check project existence",
        error: error.message,
      });
  }
};

// Create a new project
exports.addProject = async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = await projectService.addProject(projectData);
    res.status(httpStatus.CREATED).json(newProject);
  } catch (error) {
    console.error(`Catch Error: in addProject => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// Retrieve all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(httpStatus.OK).json(projects);
  } catch (error) {
    console.error(`Catch Error: in getAllProjects => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Update project details
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const updatedProject = await projectService.updateProject(
      projectId,
      projectData
    );
    res.status(httpStatus.OK).json(updatedProject);
  } catch (error) {
    console.error(`Catch Error: in updateProject => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update project", error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    await projectService.deleteProject(projectId);
    res.status(httpStatus.OK).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(`Catch Error: in deleteProject => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete project", error: error.message });
  }
};
