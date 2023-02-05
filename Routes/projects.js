const express = require('express');
const router = express.Router();

const ProjectController = require('../Controllers/projects')

const middlewareContoller = require('../middleware/auth')

router.get("/getProjects", middlewareContoller.authentication , ProjectController.getProjects)

router.post("/addProjects", middlewareContoller.authentication , ProjectController.postProjects)

router.get("/getTasks/:id",ProjectController.getTasks)

router.post("/addTasks",ProjectController.postTask)


module.exports=router;
