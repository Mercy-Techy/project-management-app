import { useNavigate, useNavigation } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import Alert from "./Alert";
import { postProject, postTask } from "../http";
import { useDispatch } from "react-redux";
import { projectActions } from "../store/projectSlice";
import Input from "./Input";

const ProjectForm = ({ type, projectId }) => {
  const [invalid, setInvalid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectDetails = Object.fromEntries(fd.entries());
    const keywords = Object.keys(projectDetails);
    for (let keyword of keywords) {
      if (!projectDetails[keyword] || projectDetails[keyword].length < 3) {
        setInvalid(keyword);
        setShowModal("Invalid Input");
        return;
      }
    }
    if (type == "Project") {
      const project = await postProject(projectDetails);
      if (!project.status) {
        setShowModal(project.message);
        return;
      }
      dispatch(projectActions.addProject(project.data));
      return navigate("/projects");
    }
    projectDetails.project = projectId;
    const task = await postTask(projectDetails);
    if (!task.status) {
      setShowModal(task.message);
      return;
    }
    return navigate(`/projects/${projectId}`);
  };

  const hideModal = () => setShowModal(false);

  return (
    <form className="p-10 w-full" onSubmit={onSubmitHandler}>
      {showModal && <Alert closeModal={hideModal}>{showModal}</Alert>}
      <p className="font-bold text-4xl mb-10">Add {type}</p>
      <Input
        name="name"
        type="text"
        label={type === "Project" ? "Project" : "Task"}
        invalidData={invalid}
      />
      {type === "Project" && (
        <>
          <Input
            name="startDate"
            type="date"
            label="Start Date"
            invalidData={invalid}
          />
          <Input
            name="endDate"
            type="date"
            label="End Date"
            invalidData={invalid}
          />
        </>
      )}
      {type !== "Project" && (
        <Input
          name="deadLine"
          type="date"
          label="Deadline"
          invalidData={invalid}
        />
      )}
      <Button type="submit" styles="w-28 mt-10">
        {navigation.state === "submitting" ? "Submitting" : "Add"}
      </Button>
    </form>
  );
};

export default ProjectForm;
