const { response, request } = require("express");
const Database = require("../database/config");
const { Project } = require("../models");

const mongoose = require("mongoose");
const { body } = require("express-validator");

const db = new Database(); //new database instance

const createProject = async (req = request, res = response) => {
    const body = req.body;
    try {
        await db.connect();
        let project = new Project(body); //new model project instance
        console.log(project);
        await project.save();
        await db.disconnect();
        res.status(200).json({
            msg: "created",
            ok: true,
        });
    } catch (error) {
        console.error(error);
        db.disconnect();
        res.status(500).json({
            msg: "Report this issue to the admin",
            ok: false,
        });
    }
};

const getProjects = async (req = request, res = response) => {
    try {
        let { id } = req.params;
        id = mongoose.Types.ObjectId(id);
        await db.connect();
        const data = await Project.find({ partnerID: [id] }); //gets all projects
        await db.disconnect();

        if (data.length > 1) {
            res.status(200).json({
                msg: "Got it",
                ok: true,
                data,
            });
        } else {
            // console.log(data);
            res.status(200).json({
                msg: "Got it",
                ok: true,
                data: data[0],
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Report this issue to the admin",
            ok: false,
        });
    }
};

const getProject = async(req = request, res = response) => {
    let { id } = req.params;
    try {
        await db.connect();
        let project = await Project.findById(id);
        await db.disconnect();
        res.status(200).json({
            msg : "Got it",
            ok : true,
            data: project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal error, report this issue to the admin",
            ok: false,
        });
    }
};

const deleteProject = async(req = request , res = response) =>{
    let {id} = req.params;
    try{
        await db.connect();
        await Project.findByIdAndDelete(id);
        await db.disconnect();
        res.status(200).json({
            msg: "Project with id "+id+" deleted",
            ok: true,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: "report this issue with the admin",
            ok: false
        });
    }
}

const updateProject = async(req = request, res= respone) => {
    let { id } = req.params;
    let projectUpdated = req.body;
    try {
        await db.connect();
        await Project.findByIdAndUpdate(id, projectUpdated);
        await db.disconnect();

        res.status(200).json({
            msg: `Project with ${id} was updated`,
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Report this issue to the admin",
            ok : false
        });
    }
}
module.exports = {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
};
