import { OAuth2Client } from("google-auth-library");
import jwt from("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify Google Token and log in the user
exports.googleAuth = async (req, res) => {
  const { idToken } = req.body; // The idToken sent from the React frontend

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload; // Extract useful info (sub is the user ID)

    // Check if the user exists in your database (for now, assuming user is authenticated)
    // You can add logic to check the database, create a new user if they don't exist, etc.

    // Generate JWT (session token)
    const token = jwt.sign(
      {
        userId: sub, // Use Google user ID
        email: email,
        name: name,
      },
      process.env.JWT_SECRET, // JWT Secret key
      { expiresIn: "1h" } // Token expiry time
    );

    // Return the token and user info
    res.status(200).json({
      message: "Google authentication successful",
      token: token,
      user: {
        userId: sub,
        email: email,
        name: name,
        picture: picture,
      },
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google Token" });
  }
};
