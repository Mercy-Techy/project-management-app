import { useSelector } from "react-redux";
import { useParams, Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { deleteProject, fetchTasks } from "../http";
import Button from "../components/Button";
import TaskTable from "../components/TaskTable";
import Alert from "../components/Alert";
import { projectActions } from "../store/projectSlice";
import { useDispatch } from "react-redux";

const ProjectDetail = () => {
  const [error, setError] = useState();
  const alertHandler = () => setError();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useLoaderData();
  const { projectId } = useParams();
  const project = useSelector((state) => {
    let project = state.projects.find((pr) => pr._id === projectId);
    return project;
  });
  const deleteProjectHandler = async (projectId) => {
    const response = await deleteProject(projectId);
    if (!response.status) return setError(response.message);
    dispatch(projectActions.deleteProject(projectId));
    return navigate("/projects");
  };

  if (error) {
    return <Alert closeModal={alertHandler}>{error}</Alert>;
  }
  return (
    <div className="w-full p-10">
      <div className="pb-4 border-b-2 border-stone-400 flex gap-7">
        <p className="font-bold text-4xl mb-10 ">{project.name}</p>
        <div className="flex mt-2">
          <Link
            to={`/projects/${projectId}/editProject/${project.name}/${project.startDate}/${project.endDate}/${project._id}`}
          >
            <FaRegEdit className="text-3xl" />
          </Link>
          <div onClick={() => deleteProjectHandler(project._id)}>
            <MdDelete className="text-3xl" />
          </div>
        </div>
      </div>
      <p>START DATE: {project.startDate.split("T")[0]}</p>
      <p>END DATE: {project.endDate.split("T")[0]}</p>

      <div className="flex justify-between mt-10">
        <p className="font-bold text-2xl mt-3">Tasks</p>
        <Link to={`/projects/${project._id}/addTask`}>
          <Button>Add Task</Button>
        </Link>
      </div>
      <TaskTable tasks={tasks} projectId={project._id} />
    </div>
  );
};

export default ProjectDetail;

export const loader = async ({ request, params }) => {
  const tasks = await fetchTasks(params.projectId);
  if (!tasks.status) throw new Error(tasks.message);
  return tasks.data;
};
