import axios from "axios";

export const fetchProjects = async () => {
  try {
    const projects = await axios("http://localhost:3000/projects");
    return { status: true, message: "projects", data: projects.data.data };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const postProject = async (projectData) => {
  try {
    const project = await axios.post(
      "http://localhost:3000/projects",
      projectData
    );
    return {
      status: true,
      message: "projects",
      data: project.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const fetchTasks = async (id) => {
  try {
    const project = await axios("http://localhost:3000/project/" + id);
    return {
      status: true,
      message: "tasks",
      data: project.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const postTask = async (taskDetails) => {
  try {
    const task = await axios.post("http://localhost:3000/tasks", taskDetails);
    return {
      status: true,
      message: "Task added",
      data: task.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const editTask = async (taskDetails) => {
  try {
    const task = await axios.put("http://localhost:3000/tasks", taskDetails);
    return {
      status: true,
      message: "Task Edited",
      data: task.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const editProject = async (projectDetails) => {
  try {
    const project = await axios.put(
      "http://localhost:3000/projects",
      projectDetails
    );
    return {
      status: true,
      message: "Project Edited",
      data: project.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};
export const deleteTask = async (taskId) => {
  try {
    const task = await axios.delete("http://localhost:3000/tasks/" + taskId);
    return {
      status: true,
      message: "Task Deleted",
      data: task.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};

export const deleteProject = async (projectId) => {
  try {
    const project = await axios.delete(
      "http://localhost:3000/projects/" + projectId
    );
    return {
      status: true,
      message: "Project Deleted",
      data: project.data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
      data: error,
    };
  }
};
