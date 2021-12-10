import React from "react";
import { Button, Input, Flex } from "theme-ui";

type SummaryTaskProps = {
  task: string;
  handleDelete: (id: number) => void;
  id: number;
  handleEdit: (id: number, newTask: string, onSuccess: () => void) => void;
};

const SummaryTask = ({
  task,
  handleDelete,
  id,
  handleEdit,
}: SummaryTaskProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTask, setNewTask] = React.useState(task);

  const onEditOrSaveClick = () => {
    if (isEditing) {
      handleEdit(id, newTask, () => setIsEditing(false));
    } else {
      setIsEditing((prev) => !prev);
    }
  };

  const onInputChange = (e: { target: { value: string } }) => {
    setNewTask(e.target.value);
  };

  return (
    <Flex key={task} sx={{ width: "100%", justifyContent: "space-between" }}>
      {isEditing ? (
        <Input value={newTask} onChange={onInputChange} />
      ) : (
        <p>{task}</p>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          ml={2}
          sx={{ variant: "buttons.skeleton" }}
          onClick={onEditOrSaveClick}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          ml={2}
          sx={{ variant: "buttons.skeleton" }}
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </div>
    </Flex>
  );
};

export default SummaryTask;
