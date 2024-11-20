// import express from "express";
// import devices from "./devices.js";

// const router = express.Router();

// router.use("/device", devices);

// export default router;
// authRoutes.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route for Google to redirect to
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/home/school-admin", // After successful login, redirect here
//     failureRedirect: "http://localhost:5173/", // On failure, redirect to login
//   })
// );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     if (!req.user) {
//       return res.status(500).send({ message: "User authentication failed." });
//     }
//     res.send({ message: "Authentication successful!", user: req.user });
//   }
// );


// Route for logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Protected route example (Dashboard)
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
   // res.send('Welcome to your dashboard! ');
    res.send(`
    <h1>Welcome to your dashboard!</h1>
    <a href="/login"><button>Login with Google</button></a>
  `);
  } else {
    res.redirect('/login');
  }
});

router.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <a href="/auth/google"><button>Login with Google</button></a>
  `);
});
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      const token = req.user.token;
      const role = req.user.role;

      if (!token || !role) {
        console.error("Token or role is missing:", { token, role });
        return res.status(500).send("Authentication failed");
      }

      // Send an HTML page with a script to communicate with the opener
      res.send(`
                <html>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ token: "${token}", role: "${role}" }, "*");
                            window.close();
                        } else {
                            document.write('Authentication successful. You can close this window.');
                        }
                    </script>
                </body>
                </html>
            `);
    } catch (error) {
      console.error("Error in Google OAuth callback:", error);
      res.status(500).send("Authentication failed");
    }
  }
);
export default router;

// import express from "express";
// import passport from "passport";

// const router = express.Router();

// // Google OAuth route
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Callback route for Google to redirect to
// // router.get(
// //   "/auth/google/callback",
// //   passport.authenticate("google", { failureRedirect: "/login" }),
// //   (req, res) => {
// //     console.log("Authenticated User:", req.user); // Log authenticated user
// //     res.send({ message: "Authentication successful!", user: req.user });
// //   }
// // );
// // Callback route for Google to redirect to
// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/dashboard', // After successful login, redirect here
//     failureRedirect: '/login',     // On failure, redirect to login
//   })
// );

// // Route for logout
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/login"); // Change this to an actual route if needed
// });

// // Protected route example (Dashboard)
// router.get("/dashboard", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send("Welcome to your dashboard!");
//   } else {
//     res.redirect("/login"); // Change this to an actual login route if needed
//   }
// });

// export default router;

