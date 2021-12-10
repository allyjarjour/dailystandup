import { updateTasks } from "../requests/requests";
import SummaryTask from "./SummaryTask";

const SummaryTasks = ({ tasks, noteId, refreshNote }) => {
  const handleDelete = (i) => {
    const tasksToSave = [...tasks];
    tasksToSave.splice(i, 1);
    updateTasks(tasksToSave, noteId, refreshNote);
  };

  const handleEdit = (i, newTask, onSuccess) => {
    const tasksToSave = [...tasks];
    tasksToSave[i] = newTask;
    const onSuccessEvents = () => {
      refreshNote();
      typeof onSuccess === "function" && onSuccess();
    };
    updateTasks(tasksToSave, noteId, onSuccessEvents);
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
