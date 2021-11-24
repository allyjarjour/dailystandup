import { ObjectId } from "bson";
import nc from "next-connect";
import middleware from "../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler
  .get(async (req, res) => {
    const {
      query: { id },
    } = req;
    try {
      let doc = await req.db
        .collection("allNotes")
        .findOne({ _id: ObjectId(id) });
      res.json({ data: doc });
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
