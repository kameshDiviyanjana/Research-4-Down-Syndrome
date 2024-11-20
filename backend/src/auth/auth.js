// //  express = require("express");
//  import express from "express";
// import { googleAuth } from ("../controllers/authController");

// const router = express.Router();

// router.post("/google", googleAuth); // Route for Google Authentication

// module.exports = router;

// routes/auth.js
import express from 'express';
import { googleAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/google', googleAuth); // Route for Google Authentication

export default router;

