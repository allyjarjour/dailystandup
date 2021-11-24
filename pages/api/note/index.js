import nc from "next-connect";
import middleware from "../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    let doc = await req.db.collection("allNotes").find().toArray();
    res.json({ data: doc });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

handler.post(async (req, res) => {
  const noteToSave = {
    ...req.body,
  };

  try {
    let note = await req.db.collection("allNotes").insertOne(noteToSave);
    res.json({ _id: note.insertedId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default handler;
