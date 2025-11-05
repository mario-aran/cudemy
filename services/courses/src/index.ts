import express from "express";

const app = express();

app.use("/", (_, res) => {
  res.json({ message: "Hello world" });
});

app.listen(3000);
