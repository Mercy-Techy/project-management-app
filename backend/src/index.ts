import express, {
  Application,
  json,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";

import db from "./db";
import router from "./router";

const app: Application = express();
const PORT = process.env.PORT || 3000;
db().then(() => console.log("Database Connected"));

app.use(cors());
app.use(json());

app.use(router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({ message: error.message });
});
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Requested route does not exist" });
});

app.listen(PORT, () => console.log("Server is running"));
