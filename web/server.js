import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join('/app', 'dist')));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Started Curotech web server in http://localhost:${PORT}`);
});
