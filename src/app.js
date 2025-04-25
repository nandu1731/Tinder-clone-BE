import express from "express";

const app = express();
const port = 3000;

// 🔥 Serve static files first
app.use(express.static("src/public"));

app.get("/", (req, res) => {
  res.send("Home page, welcome nandini!");
});

app.post("/", (req, res) => {
  res.send("Post request received");
});

app.get("/test", (req, res) => {
  res.send("Test page");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
