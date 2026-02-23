const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const authRouter = require("./BACKEND/routes/auth");

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //define connection
});

const connection = mongoose.connection; //assign database connection for a constant variable

connection.once("open", () => {
  //open connection for one time
  console.log("MongoDB connection was successful"); //display message in console when the connection was successful
});

const app = express();

//define a port for server
const PORT = process.env.PORT || 8070; //accually process.env.PORT is inbuilt

app.use(cors());
app.use(express.json()); //parse various different custom JSON types as JSO

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

// health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error('Backend error:', err) // <-- this will appear in CI logs
  res.status(err.status || 500).json({ error: err.message })
});

app.use("/api/auth", require("./BACKEND/routes/auth"));
app.use("/research-topic", require("./BACKEND/routes/ResearchTopic"));
app.use("/student-group", require("./BACKEND/routes/StudentGroups"));
app.use("/mark-scheme", require("./BACKEND/routes/MarkScheme"));
app.use("/chat", require("./BACKEND/routes/Chat"));
app.use("/document-upload", require("./BACKEND/routes/SubmitDocument"));
app.use("/evaluation-history", require("./BACKEND/routes/EvaluationHistory"));
app.use("/upload-document", require("./BACKEND/routes/UploadDocument"));
app.use("/submit-presentation", require("./BACKEND/routes/UploadPresentation"));


app.use(express.json());

// Create a write stream (in append mode) for backend.log
const logStream = fs.createWriteStream(path.join(__dirname, "backend.log"), { flags: "a" });

// Log all requests to both console and backend.log
app.use(morgan("combined", { stream: logStream }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRouter);

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/testdb";
mongoose.connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));