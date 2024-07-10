import { Request, Response, NextFunction } from "express";

import { Project, Task } from "./model";
import { response } from "./util";
import {
  createItem,
  fetchItem,
  fetchItems,
  deleteItem,
  editItem,
} from "./service";

export const addProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await createItem(Project, req.body);
    if (!project.status) throw new Error(project.message);
    return response(res, 201, project.message, project.data);
  } catch (error) {
    next(error);
  }
};

export const fetchProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await fetchItems(Project);
    if (!projects.status) throw new Error(projects.message);
    return response(res, 200, projects.message, projects.data);
  } catch (error) {
    next(error);
  }
};

export const fetchProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await fetchItem(Project, req.params.id);
    if (!project.status) throw new Error(project.message);
    return response(res, 200, project.message, project.data);
  } catch (error) {
    next(error);
  }
};

export const editProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, ...others } = req.body;
    const editedProject = await editItem(Project, id, others);
    if (!editedProject.status) throw new Error(editedProject.message);
    return response(res, 200, editedProject.message, editedProject.data);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProject = await deleteItem(Project, req.params.id);
    if (!deletedProject.status) throw new Error(deletedProject.message);
    return response(res, 200, deletedProject.message);
  } catch (error) {
    next(error);
  }
};

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await createItem(Task, req.body, "Task");
    if (!task.status) throw new Error(task.message);
    return response(res, 201, task.message, task.data);
  } catch (error) {
    next(error);
  }
};

export const fetchTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await fetchItems(Task, "Task", {
      project: req.params.project,
    });
    if (!task.status) throw new Error(task.message);
    return response(res, 200, task.message, task.data);
  } catch (error) {
    next(error);
  }
};

export const fetchTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await fetchItem(Task, req.params.id, "Task");
    if (!task.status) throw new Error(task.message);
    return response(res, 200, task.message, task.data);
  } catch (error) {
    next(error);
  }
};

export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, ...others } = req.body;
    const editedTask = await editItem(Task, id, others, "Task");
    if (!editedTask.status) throw new Error(editedTask.message);
    return response(res, 200, editedTask.message, editedTask.data);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedTask = await deleteItem(Task, req.params.id, "Task");
    if (!deletedTask.status) throw new Error(deletedTask.message);
    return response(res, 200, deletedTask.message);
  } catch (error) {
    next(error);
  }
};
