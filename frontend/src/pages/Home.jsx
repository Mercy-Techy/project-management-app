import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center mt-16">
      <p className="text-4xl font-bold">Welcome to your Project manager</p>
      <Link to="/projects" className="mt-10">
        <Button>View Your Projects</Button>
      </Link>
    </div>
  );
};

export default Home;
