import { configureStore, createSlice } from "@reduxjs/toolkit";
import { deleteProject, editProject } from "../http";

const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [] },
  reducers: {
    fetchProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects = [...state.projects, action.payload];
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },
    editProject(state, action) {
      const projectIndex = state.projects.findIndex(
        (project) => project._id === action.payload.id
      );
      state.projects[projectIndex] = action.payload.data;
    },
  },
});

export const projectActions = projectSlice.actions;

const store = configureStore({
  reducer: projectSlice.reducer,
});

export default store;
