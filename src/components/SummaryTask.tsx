import React from "react";
import { Button, Input, Flex, Textarea } from "theme-ui";

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
    <Flex
      key={task}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: ["column", "row", "row"],
      }}
    >
      {isEditing ? (
        <Textarea value={newTask} onChange={onInputChange} rows={1} />
      ) : (
        <p>{task}</p>
      )}
      <Flex sx={{ alignItems: "center", minWidth: 175 }} mb={["20px", 0, 0]}>
        <Button
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
      </Flex>
    </Flex>
  );
};

export default SummaryTask;
