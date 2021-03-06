"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Module imports
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("../config/database"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const user_1 = __importDefault(require("./routes/api/user"));
const tweet_1 = __importDefault(require("./routes/api/tweet"));
const app = express_1.default();
// Connect to MongoDB
database_1.default();
// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
const server = http_1.default.createServer(app);
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
app.get("/", (_req, res) => {
    res.json({ status: "Glitter api running" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
app.use("/api/tweet", tweet_1.default);
const port = app.get("port");
server.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
//# sourceMappingURL=server.js.map