import express from "express";
import client from "prom-client";
import { requestCountMiddleware } from "./metrics/reqCount";
const app = express();

app.use(express.json());
app.use(requestCountMiddleware);


app.get("/user", (req, res) => {
  res.send({
    name: "John Doe",
    age: 25,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1,
  });
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000);
