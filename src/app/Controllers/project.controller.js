// controllers/projectController.js
const httpStatus = require("http-status");
const projectService = require("../services/project.service");
const { getStoragePath } = require("../../helpers/storageUtil");
const { Roles } = require("../../helpers/roles");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const body = req.body || {};
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
      body.files = projectFiles;
    }
    body.assignTo = body.assignTo || []; 
    const newProject = await projectService.addProject(body);
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
exports.getAllById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req?.params?.id);
    res.status(httpStatus.OK).json(project);
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
    const { projectId } = req.params;
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
    const { projectId } = req.params;
    await projectService.deleteProject(projectId);
    res.status(httpStatus.OK).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(`Catch Error: in deleteProject => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

const canComment = (user, project) => {
  
    if (!user) return false;
    const allowedRoles = [Roles.SuperAdmin, Roles.ADMIN, Roles.USER];
    return allowedRoles.includes(user?.role) || project.assignTo.includes(user?.userId);
 
};

exports.addCommentSToProject = async (req, res) => {
  try {
    const user = await req.tokenData;
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!canComment(user, project)) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "You do not have permission to comment on this project",
      });
    }
 
    const comment = await projectService.addComment(id, {
      text: req?.body?.text,
      commentBy:user?.userId,
    });
    if (!comment) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    console.error(`Catch Error: in addCommentToProject => ${error}`);
    res
     .status(httpStatus.INTERNAL_SERVER_ERROR)
     .json({ message: "Failed to add comment to project", error: error.message });
  }
};
