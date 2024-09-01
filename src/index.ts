import express from "express";
import cors from "cors";
import { connect } from "./database/config";
import authRoutes from "./routes/auth.route";
import foodRoutes from "./routes/food.route";
import trackRoute from "./routes/tracking.route";

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(cors());
connect();

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/track", trackRoute);

app.use("/", (_req, res) => {
  res.send("Welcome to nutrition tracker API");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
