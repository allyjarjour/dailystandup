/** @jsx jsx */
import { jsx, Button, Spinner } from "theme-ui";
import Link from "next/link";
import { getNotes, submitNote } from "../src/requests/requests";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { formatNoteTitle, sortNotesByDateTitle } from "../src/util";
import { isMobile } from "react-device-detect";

const Notes = () => {
  const [value, setValue] = React.useState("");
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  const refreshNotes = async () => {
    setIsLoading(true);
    const { notes: data } = await getNotes();
    setNotes(() => {
      setIsLoading(false);
      return data;
    });
  };

  React.useEffect(() => {
    refreshNotes();
  }, []);

  const onChange = (e) => {
    setValue(e);
  };

  const onSubmit = async () => {
    const onSuccess = (id) => {
      router.push(`notes/${id}`);
    };
    submitNote(value, onSuccess);
  };

  return (
    <div sx={{ variant: "containers.page" }}>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "20px",
        }}
      >
        <Button onClick={onSubmit}>+</Button>
        <div sx={{ ml: "5px" }}>
          <DatePicker
            className="date-picker"
            selected={value}
            onChange={onChange}
          />
        </div>
      </div>
      {isLoading ? (
        <Spinner sx={{ width: "100%", mt: "2rem" }} />
      ) : (
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {notes.length > 0 ? (
            sortNotesByDateTitle(notes).map((note, i) => {
              return (
                <div sx={{ width: isMobile ? "100%" : "33%", p: 2 }} key={i}>
                  <Link
                    key={note._id}
                    href="/notes/[id]"
                    as={`/notes/${note._id}`}
                  >
                    <div sx={{ variant: "containers.card" }}>
                      <strong>{formatNoteTitle(note.title)}</strong>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div
              sx={{ textAlign: "center", width: "100%", fontStyle: "italic" }}
            >
              {" "}
              No notes
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;
