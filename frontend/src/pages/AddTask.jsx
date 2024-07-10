import ProjectForm from "../components/ProjectForm";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { projectId } = useParams();
  return <ProjectForm type="Task" projectId={projectId} />;
};

export default AddTask;
