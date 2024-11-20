// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import jwt  from"jsonwebtoken";
// // import configurePassport from "./util/auth/googleStrategy.js";
// import passport from './util/auth/googleStrategy.js'; // Assuming this is where Google Strategy is defined
// import authRoutes from './router/router.js'; // Import your auth routes



// const app = express();
// dotenv.config();

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

// app.use("*", cors());
// app.use(morgan("dev"));
// app.use("*", cors());
// app.use(
//   session({
//     secret: "Bear", // Replace with a secure secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(authRoutes);
// // configurePassport(passport);
// // app.use('/',()=>{
// //     console.log("is work")
// //     res.send({ message: "Awesome it works 🐻" });
// // })
// // app.get('/', async (req, res, next) => {
// //     res.send({message: 'Awesome it works 🐻'});
// // });

// //app.use("/auth/google", router);
// // dbconnction();
// // initializeFirebaseApp();
// // app.use((req, res, next) => {
// //   next(createError.NotFound);
// // });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     status: err.status || 500,
//     message: err.message,
//   });
// });
// console.log(process.env.PORT);
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import session from "express-session"; // Add this import
// import jwt from "jsonwebtoken";
// import passport from "./util/auth/googleStrategy.js"; // Assuming Google Strategy is defined here
// import authRoutes from "./router/router.js"; // Import your auth routes

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
// app.use(cors());
// app.use(morgan("dev"));

// // Session middleware for Passport
// app.use(
//   session({
//     secret:  "Bear", // Use env for security
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );

// // Passport setup
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use(authRoutes); // Your auth routes

// // Error handling middleware
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).send({
//     status: err.status || 500,
//     message: err.message,
//   });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import session from "express-session";
// import passport from "passport";
// import googleStrategy from "./util/auth/googleStrategy.js";
// import authRoutes from "./router/router.js";

// const app = express();
// dotenv.config();

// // Initialize Passport
// // Configure Google Strategy

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());
// app.use(morgan("dev"));

// app.use(
//   session({
//     secret: "Bear",
//     resave: false,
//     saveUninitialized: true,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// googleStrategy(passport); 
// app.use(authRoutes); // Use authentication routes

// // Global error handler
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     status: err.status || 500,
//     message: err.message,
//   });
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server is running on http://localhost:${PORT}`)
// );

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import configurePassport from "./util/auth/googleStrategy.js";
import authRoutes from "./router/router.js";

dotenv.config();

const app = express();
configurePassport(passport); // Configure Passport with the Google strategy

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use the secret from your .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes); // Use the authentication routes

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT =  8000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));


