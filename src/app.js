import express from "express";

const app = express();
const port = 3000;

// 🔥 Serve static files first
app.use(express.static("src/public"));

app.get("/", (req, res) => {
  res.send("Home page, welcome nandini!");
});

app.use("/", (req, res, next) => {
  console.log("middleware called");
  next();
});

app.get(/\/about[a-z0-9]{3,}/, (req, res) => {
  res.send("About page, welcome nandini!");
});

app.get("test/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.path);

  res.send("Test page, welcome nandini!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
