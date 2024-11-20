// import GoogleStrategy from "passport-google-oauth20";

// // Export the function using ES module syntax
// export default function (passport) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.CLIENT_URL,
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // Handle Google profile data
//         const user = {
//           id: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//         };
//         return done(null, user);
//       }
//     )
//   );

//   // Required for session support
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
// }
// import dotenv from "dotenv";
// //import passport from 'passport';
// //import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// dotenv.config();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID, // Use environment variables
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google", // Redirect URL
//       passReqToCallback : true
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Here you can process the user profile
//       const user = {
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         // You could save this user info in the database
//       };
//       return done(err, user);
//     }
//   )
// );

// // Required for persistent sessions
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// export default passport;

// src/util/auth/googleStrategy.js
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// export default function (passport) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//         passReqToCallback: true,
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // Check if profile is defined
//         console.log("Access Token:", accessToken);
//         console.log("Profile:", profile);

//         if (!profile) {
//           return done(new Error("No profile found"));
//         }

//         // Here you would typically find or create a user in your database
//         const user = {
//           id: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//         };

//         return done(err, profile);
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
// }

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
         passReqToCallback: true, // Pass request to the callback
      },
      (req, accessToken, refreshToken, profile, done) => {
        console.log("Access Token:", accessToken);
        console.log("Profile:", profile); // Log the profile

        if (!profile) {
          return done(new Error("No profile found"), null);
        }

        //Create a user object
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id }); // Modify this to return the full user object if needed
  });
}

