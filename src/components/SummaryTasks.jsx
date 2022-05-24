import { useQueryClient } from "react-query";
import { updateTasks } from "../requests/requests";
import SummaryTask from "./SummaryTask";

const SummaryTasks = ({ tasks, noteId, refreshNote }) => {
  const userData = useQueryClient()?.getQueryData("userData");
  const userId = userData?._id;

  const handleDelete = (i) => {
    const tasksToSave = [...tasks];
    tasksToSave.splice(i, 1);
    updateTasks(tasksToSave, noteId, userId, refreshNote);
  };

  const handleEdit = (i, newTask, onSuccess) => {
    const tasksToSave = [...tasks];
    tasksToSave[i] = newTask;
    const onSuccessEvents = () => {
      refreshNote();
      typeof onSuccess === "function" && onSuccess();
    };
    updateTasks(tasksToSave, noteId, userId, onSuccessEvents);
  };

  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      {tasks.map((t, i) => (
        <li key={i}>
          <SummaryTask
            task={t}
            id={i}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default SummaryTasks;
