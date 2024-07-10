import EditForm from "../components/EditFrom";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const data = useParams();
  return <EditForm type="Project" data={data} />;
};

export default EditProject;
