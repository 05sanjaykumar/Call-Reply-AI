import express, {  Request, Response } from "express";
import dotenv from "dotenv";

import twilio from "twilio";
dotenv.config();

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH!
);


const app = express();

// Twilio sends application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is alive");
  console.log("SID:", process.env.TWILIO_SID);
  console.log("AUTH:", process.env.TWILIO_AUTH);
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

app.get("/test-call", async (_req: Request, res: Response) => {
  try {
    await client.calls.create({
      to: process.env.MY_PHONE!,
      from: process.env.TWILIO_NUMBER!,
      url: "http://demo.twilio.com/docs/voice.xml"
    });

    res.send("Calling your phone...");
  } catch (err) {
    console.error(err);
    res.status(500).send("Call failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});