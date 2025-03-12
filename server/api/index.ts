import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", routes);

app.get("/", (_req, res) => {
    res.send("Hello from the server!");
});

app.listen(1234, () => {
    console.log("Server is running on port 1234");
});

export default app;