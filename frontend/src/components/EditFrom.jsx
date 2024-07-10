import { useNavigate, useNavigation } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import Alert from "./Alert";
import { editTask, editProject } from "../http";
import { useDispatch } from "react-redux";
import { projectActions } from "../store/projectSlice";
import Input from "./Input";

const EditForm = ({ type, data }) => {
  const [invalid, setInvalid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const inputDetails = Object.fromEntries(fd.entries());
    const keywords = Object.keys(inputDetails);
    for (let keyword of keywords) {
      if (!inputDetails[keyword] || inputDetails[keyword].length < 3) {
        setInvalid(keyword);
        setShowModal("Invalid Input");
        return;
      }
    }
    if (type == "Project") {
      inputDetails.id = data.id;
      const project = await editProject(inputDetails);
      if (!project.status) {
        setShowModal(project.message);
        return;
      }
      console.log(project);
      dispatch(
        projectActions.editProject({ id: project.data._id, data: project.data })
      );
      return navigate(`/projects`);
    } else {
      inputDetails.id = data.id;
      const task = await editTask(inputDetails);
      if (!task.status) {
        setShowModal(task.message);
        return;
      }
      return navigate(`/projects/${data.projectId}`);
    }
  };

  const hideModal = () => setShowModal(false);

  return (
    <form className="p-10 w-full" onSubmit={onSubmitHandler}>
      {showModal && <Alert closeModal={hideModal}>{showModal}</Alert>}
      <p className="font-bold text-4xl mb-10">Edit {type}</p>
      <Input
        name="name"
        type="text"
        label={type}
        invalidData={invalid}
        value={data.name}
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
        <>
          <Input
            name="deadLine"
            type="date"
            label="Deadline"
            invalidData={invalid}
          />
          <div className="pt-5">
            <label htmlFor="status" className="block my-2">
              Status
            </label>
            <select
              name="status"
              id=""
              className="outline-none shadow-sm w-96 p-2"
            >
              <option value="not-completed">Not Complete</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Complete</option>
            </select>
          </div>
        </>
      )}
      <Button type="submit" styles="w-28 mt-10">
        {navigation.state === "submitting" ? "Submitting" : "Add"}
      </Button>
    </form>
  );
};

export default EditForm;
