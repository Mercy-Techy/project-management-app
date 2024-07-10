import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Projects = () => {
  const data = useSelector((state) => state.projects);

  let content = <p className="m-auto">Kindly add a project</p>;

  if (data.length)
    content = (
      <ul className="grid grid-cols-3 gap-5">
        {data.map((project) => (
          <Link
            to={project._id}
            key={project._id}
            className="bg-blue-500 text-white rounded-md shadow-lg p-16 hover:bg-sky-700"
          >
            {project.name}
          </Link>
        ))}
      </ul>
    );

  return (
    <div className="w-full p-10">
      <div className="flex justify-between">
        <input
          className="outline-none shadow-sm w-96 p-2"
          type="text"
          name="search"
          placeholder="projects..."
        />
        <Link to="/projects/add">
          <Button>Add Project</Button>
        </Link>
      </div>
      <div className="mt-16">{content}</div>
    </div>
  );
};

export default Projects;
