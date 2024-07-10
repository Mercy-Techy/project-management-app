import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Projects from "./pages/projects";
import Error from "./pages/Error";
import AddProject from "./pages/AddProject";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { fetchProjects } from "./http";
import { projectActions } from "./store/projectSlice";
import { useDispatch } from "react-redux";
import ProjectDetail, {
  loader as projectDetailsLoader,
} from "./pages/ProjectDetail";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import EditProject from "./pages/EditProject";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProjects = async () => {
      const projects = await fetchProjects();
      if (projects.status) {
        dispatch(projectActions.fetchProjects(projects.data));
      }
    };
    getProjects();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "projects",
          children: [
            {
              index: true,
              element: <Projects />,
            },
            { path: "add", element: <AddProject /> },
            {
              path: ":projectId",
              children: [
                {
                  index: true,
                  element: <ProjectDetail />,
                  loader: projectDetailsLoader,
                },
                { path: "addTask", element: <AddTask /> },
                {
                  path: "editTask/:name/:deadLine/:status/:id",
                  element: <EditTask />,
                },
                {
                  path: "editProject/:name/:startDate/:endDate/:id",
                  element: <EditProject />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
