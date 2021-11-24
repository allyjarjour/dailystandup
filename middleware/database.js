import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, _res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGO_DB);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
