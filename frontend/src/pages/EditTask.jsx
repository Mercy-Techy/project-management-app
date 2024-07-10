import EditForm from "../components/EditFrom";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const data = useParams();
  return <EditForm type="Task" data={data} />;
};

export default EditTask;
