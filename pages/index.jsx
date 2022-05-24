/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import Link from "next/link";
import { submitNote } from "../src/requests/requests";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { formatNoteTitle, sortNotesByDateTitle } from "../src/util";
import { isMobile } from "react-device-detect";
import { useQueryClient } from "react-query";

const Notes = () => {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("userData");

  const onChange = (e) => {
    setValue(e);
  };

  const onSubmit = async () => {
    const onSuccess = async (id) => {
      await queryClient.refetchQueries(["userData"], { active: true });
      router.push(`notes/${id}`);
    };
    submitNote(value, data?._id, onSuccess);
  };

  return (
    <>
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
        {data?.notes?.length > 0 ? (
          sortNotesByDateTitle(data.notes).map((note, i) => {
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
    </>
  );
};

export default Notes;
