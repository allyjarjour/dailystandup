import { ObjectId } from "bson";
import nc from "next-connect";
import middleware from "../../../../middleware/database";

const handler = nc();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    const {
      query: { id },
      body,
    } = req;
    await req.db
      .collection("allNotes")
      .update({ _id: ObjectId(id) }, { $set: { tasks: body } });
    res.json("Tasks updated.");
  } catch (e) {
    res.status(404);
    res.end();
    return;
  }
});

export default handler;
