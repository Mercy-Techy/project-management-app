import { Router } from "express";
import * as ctrl from "./controller";

const router = Router();

router.get("/projects", ctrl.fetchProjects);
router.get("/project/:id", ctrl.fetchProject);
router.post("/projects", ctrl.addProject);
router.put("/projects", ctrl.editProject);
router.delete("/projects/:id", ctrl.deleteProject);
router.get("/task/:id", ctrl.fetchTask);
router.get("/tasks/:project", ctrl.fetchTasks);
router.post("/tasks", ctrl.addTask);
router.put("/tasks", ctrl.editTask);
router.delete("/tasks/:id", ctrl.deleteTask);

export default router;
