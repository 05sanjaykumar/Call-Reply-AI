import express, {  Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Twilio sends application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is alive");
});

app.post("/call-status", (req: Request, res: Response) => {
  console.log("\n📞 CALL EVENT RECEIVED");
  console.log(req.body);

  const status = req.body.CallStatus;
  const from = req.body.From;

  if (status === "no-answer") {
    console.log(`Missed call from ${from}`);
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});