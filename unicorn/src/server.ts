//Module imports
import bodyParser from "body-parser";
import express from "express";
import { Response } from 'express'
import cors from 'cors';
import http from "http";

//Relative imports
import Request from './types/Request'
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import tweet from "./routes/api/tweet"

const app = express();



// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const server = http.createServer(app);

//socket 
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
app.set('socketio', io);


// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "Glitter api running" });
});


app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/tweet", tweet);


const port = app.get("port");
server.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
