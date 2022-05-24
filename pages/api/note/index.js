import nc from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "bson";

const handler = nc();

handler.use(middleware);

handler.post(async (req, res) => {
  const noteToSave = {
    ...req.body.note,
  };

  try {
    const _id = new ObjectId();
    await req.db
      .collection("allNotesByUser")
      .updateOne(
        { _id: ObjectId(req.body.id) },
        { $push: { notes: { ...noteToSave, _id } } }
      );
    res.json({ _id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default handler;
