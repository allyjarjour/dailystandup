import nc from "next-connect";
import middleware from "../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler.post(async (req, res) => {
  const noteToSave = {
    ...req.body.note,
  };

  try {
    let note = await req.db
      .collection("allNotesByUser")
      .findOne({ _id: ObjectId(req.body.id) })
      .notes.insertOne(noteToSave);
    res.json({ note });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// new one here
// handler.post(async (req, res) => {
//   const {
//     body: { email },
//   } = req;
//   try {
//     let doc = await req.db.collection("allNotesByUser").findOne({ email });
//     res.json({ data: doc });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

export default handler;
