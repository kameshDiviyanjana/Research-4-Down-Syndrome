import express from "express";
import devices from "./devices.js";

const router = express.Router();

router.use("/device", devices);

export default router;
