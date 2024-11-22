// 

import express from "express"; // import express
import dotenv from "dotenv"; // import dotenv for environment variables
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./lib/db.js";
import { app , server} from "./lib/socket.js";
import path from "path";
import { get } from "http";


dotenv.config();

// Set the payload limit to 50MB
app.use(express.json({ limit: '50mb' })); // This will increase the limit for JSON bodies
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  // origin: "*",
  credentials: true
}));

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "/index.html"));
  });
}

console.log("NODE_ENV:", process.env.NODE_ENV);


server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDb();
});

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
// server.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });
