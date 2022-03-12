/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import Link from "next/link";
import { getNotes, submitNote } from "../src/requests/requests";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { formatNoteTitle, sortNotesByDateTitle } from "../src/util";
import { isMobile } from "react-device-detect";

const Notes = ({ notes }) => {
  const [value, setValue] = React.useState("");
  const router = useRouter();

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
        <Button disabled={!value} onClick={onSubmit}>
          +
        </Button>
        <div sx={{ ml: "5px" }}>
          <DatePicker
            className="date-picker"
            selected={value}
            onChange={onChange}
          />
        </div>
      </div>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {notes?.length > 0 ? (
          sortNotesByDateTitle(notes).map((note, i) => {
            return (
              <div sx={{ width: isMobile ? "100%" : "33%", p: 2 }} key={i}>
                <Link
                  key={note._id}
                  href="/notes/[id]"
                  as={`/notes/${note._id}`}
                >
                  <div sx={{ variant: "containers.card", cursor: "pointer" }}>
                    <strong>{formatNoteTitle(note.title)}</strong>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div sx={{ textAlign: "center", width: "100%", fontStyle: "italic" }}>
            {" "}
            No notes
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotes();

  return {
    props: { notes: notes ?? {} },
  };
};

export default Notes;
