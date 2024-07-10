import { FaTasks } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const data = useSelector((state) => state.projects);

  let content = <p>No Projects</p>;
  if (data.length) {
    content = (
      <>
        {data.map((project) => {
          return (
            <Link
              to={`/projects/${project._id}`}
              key={project._id}
              className="py-3 flex gap-2 hover:bg-sky-50 rounded-md cursor-pointer"
            >
              <FaTasks className="mt-2 w-4 h-4 p-0" />
              <span>
                {project.name.length > 10
                  ? `${project.name.slice(0, 6)}...`
                  : project.name}
              </span>
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <nav className="bg-white w-1/5 h-screen p-7 text-lg">
      <div className="mt-5">
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>

      <p className="mt-12 text-2xl font-bold">PROJECTS</p>

      <ul className="mt-4 text-xl text-stone-600">{content}</ul>
    </nav>
  );
};

export default SideBar;
