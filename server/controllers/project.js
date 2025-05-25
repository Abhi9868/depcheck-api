const Project = require("../models/Project");

exports.createProject = async (req, res) => {
    const { repoUrl, accessToken } = req.body;
    const project = await Project.create({ repoUrl, accessToken, user: req.user._id });
    res.status(201).json(project);
};

exports.getUserProjects = async (req, res) => {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
};
