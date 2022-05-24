import { ObjectId } from "bson";
import nc from "next-connect";
import middleware from "../../../../../../middleware/database";
// import middleware from "../../../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    const {
      query: { id, noteId },
      body,
    } = req;
    await req.db
      .collection("allNotesByUser")
      .updateOne(
        { _id: ObjectId(id), "notes._id": ObjectId(noteId) },
        { $set: { "notes.$.tasks": body } }
      );
    res.json("Tasks updated.");
  } catch (e) {
    res.status(404);
    res.end();
  }
});

export default handler;
