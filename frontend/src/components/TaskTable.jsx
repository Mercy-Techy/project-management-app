import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteTask } from "../http";
import { useState } from "react";
import Alert from "./Alert";

const TaskTable = ({ tasks, projectId }) => {
  const [error, setError] = useState();
  const [fetchedTasks, setFetchedTasks] = useState(tasks);

  const alertHandler = () => setError();

  const deleteTaskHandler = async (taskId) => {
    const response = await deleteTask(taskId);
    if (!response.status) {
      return setError(response.message);
    }
    setFetchedTasks((prevState) =>
      prevState.filter((task) => task._id !== taskId)
    );
  };

  if (!fetchedTasks.length) {
    return (
      <p className="text-center mt-16 text-xs w-full">
        Tasks are not available, Kindly add a task
      </p>
    );
  }
  if (error) {
    return <Alert closeModal={alertHandler}>{error}</Alert>;
  }
  return (
    <table className="w-full text-sm text-left text-gray-500 mt-7">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">DeadLine</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {fetchedTasks.map((task) => {
          return (
            <tr key={task._id} className="bg-white border-b">
              <td className="px-6 py-3">{task.name}</td>
              <td className="px-6 py-3">{task.deadLine.split("T")[0]}</td>
              <td className="px-6 py-3">{task.status}</td>
              <td className="px-6 py-3 flex gap-2">
                <Link
                  to={`/projects/${projectId}/editTask/${task.name}/${task.deadLine}/${task.status}/${task._id}`}
                >
                  <FaRegEdit className="text-red-600" />
                </Link>
                <div onClick={() => deleteTaskHandler(task._id)}>
                  <MdDelete className="text-green-600" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskTable;
