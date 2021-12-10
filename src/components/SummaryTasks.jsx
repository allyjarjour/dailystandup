/** @jsx jsx */
import { Button, Flex } from "@theme-ui/components";
import { jsx } from "theme-ui";
import { updateTasks } from "../requests/requests";

const SummaryTasks = ({ tasks, noteId, refreshNote }) => {
  const handleDelete = (i) => {
    const tasksToSave = [...tasks];
    tasksToSave.splice(i, 1);
    updateTasks(tasksToSave, noteId, refreshNote);
  };

  return (
    <ul sx={{ listStyleType: "none", paddingLeft: 0 }}>
      {tasks.map((t, i) => (
        <Flex key={i} sx={{ width: "100%", justifyContent: "space-between" }}>
          <li>{t}</li>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{ borderRadius: "50%", variant: "buttons.skeleton" }}
              onClick={handleDelete}
            >
              -
            </Button>
          </div>
        </Flex>
      ))}
    </ul>
  );
};

export default SummaryTasks;
