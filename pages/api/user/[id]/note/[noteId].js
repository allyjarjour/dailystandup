import { ObjectId } from "bson";
import nc from "next-connect";
import middleware from "../../../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler
  .get(async (req, res) => {
    const {
      query: { id, noteId },
    } = req;
    try {
      let userInfo = await req.db
        .collection("allNotesByUser")
        .findOne({ _id: ObjectId(id) });
      const note = userInfo.notes.find((n) => n._id.equals(noteId));
      res.json({ data: note ?? {} });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  .delete(async (req, res) => {
    const {
      query: { id },
    } = req;
    try {
      await req.db.collection("allNotes").remove({ _id: ObjectId(id) });
      res.json({ data: id });
    } catch (e) {
      res.status(404);
      res.end();
      return;
    }
  });

export default handler;
