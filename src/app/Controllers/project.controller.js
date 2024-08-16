// controllers/projectController.js
const httpStatus = require("http-status");
const projectService = require("../services/project.service");
const { getStoragePath } = require("../../helpers/storageUtil");
const { Roles } = require("../../helpers/roles");
const { default: mongoose } = require("mongoose");
const { Project } = require("../Models");

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
// addProjectFiles
exports.addProjectFiles = async(req,res)=>{
  try {
    const { id } = req.params;
    const Files = req.files.files;
    if (req.files && req.files.files) {
      let files = req.files.files;
      if (!Array.isArray(Files)) {
        files = [Files];
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

    const project = await Project.findById(id);
    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Project not found' });
    }
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $push: { files: { $each: projectFiles } } }, 
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Project not found' });
    }
    res.status(httpStatus.OK).json(updatedProject);
  } catch (error) {
    console.error(`Catch Error: in addProjectFiles => ${error}`);
    res
     .status(httpStatus.INTERNAL_SERVER_ERROR)
     .json({ message: "Failed to add project files", error: error.message });
  }
}
// assign project
exports.assignProject = async (req, res) => {
  try {

    const project = await projectService.assignProject(
      req?.params?.id,
      req?.body?.assignedTo,
    );
    
    if (project.error) {
      return res.status(httpStatus.NOT_FOUND).json({ error: project.error });
    }
  
    res.status(200).json(project);  
  } catch (error) {
    res.status(400).send(error);
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
    const { id } = req.params;
    const projectData = req.body;
    const updatedProject = await projectService.updateProject(
      id,
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
    const { id } = req.params;
    await projectService.deleteProject(id);
    res.status(httpStatus.OK).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(`Catch Error: in deleteProject => ${error}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

const canComment = async (user, projectId) => {
  const allowedRoles = [Roles.SuperAdmin, Roles.ADMIN];
  const hasRolePermission = allowedRoles.includes(user?.role);
  if (hasRolePermission) {
    return true;
  } else {
    const checkUser = await Project.findOne({
      _id: projectId,
      assignedTo: { $in: user?.userId },
    });
    return !!checkUser;
  }
};

exports.addCommentSToProject = async (req, res) => {
  try {
    const user = await req.tokenData;
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!project) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Project not found" });
    }
    const isExist = await canComment(user, id);
    console.log(isExist);
    if (!isExist) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "You do not have permission to comment on this project",
      });
    }
    const comment = await projectService.addComment(id, {
      text: req?.body?.text,
      commentBy: user?.userId,
    });
    if (!comment) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(`Catch Error: in addCommentToProject => ${error}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to add comment to project",
      error: error.message,
    });
  }
};
