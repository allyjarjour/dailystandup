/** @jsx jsx */
import { jsx, Button, Input } from "theme-ui";
import { useRouter } from "next/router";
import { deleteNote, updateTasks, getNote } from "../../src/requests/requests";
import SummaryTasks from "../../src/components/SummaryTasks";
import { formatNoteTitle } from "../../src/util";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";

export default function Note() {
  const router = useRouter();
  const [note, setNote] = React.useState({ title: "", tasks: [], _id: "" });
  const [value, setValue] = React.useState("");
  const noteTitle = note.title && formatNoteTitle(note.title);
  const { tasks } = note;
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const userData = useQueryClient()?.getQueryData("userData");
  const userId = userData?._id;

  const refreshNote = async () => {
    const {
      query: { id },
    } = router;
    const data = await getNote(id, userId);
    console.log(data);
    setNote(data);
  };

  React.useEffect(() => {
    isLoggedIn ? refreshNote() : router.push("/");
  }, []);

  const handleDelete = () => {
    const onSuccess = () => router.push("/");
    deleteNote(note._id, onSuccess);
  };

  const handleAddTask = () => {
    updateTasks([...tasks, value], note._id, refreshNote);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div sx={{ variant: "containers.page" }}>
      <div sx={{ variant: "containers.note" }}>
        <div sx={{ variant: "containers.card", mt: 20, p: 30 }}>
          <h1>{noteTitle} </h1>
          <div sx={{ display: "flex", mb: "20px" }}>
            <Input onChange={handleChange} value={value} />
            <Button sx={{ ml: "5px" }} onClick={handleAddTask}>
              +
            </Button>
          </div>
          {tasks && (
            <SummaryTasks
              tasks={tasks}
              noteId={note._id}
              refreshNote={refreshNote}
            />
          )}
          <Button onClick={handleDelete}>Delete Note</Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const note = await getNote(params.id);
  return {
    props: { note: note ?? {} },
  };
};
