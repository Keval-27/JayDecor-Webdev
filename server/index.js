const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const port = process.env.PORT|| 3000;

require("dotenv").config(); // MUST be at the top!


//pass: mh6704MSZePpdUKm
//Name:KevalSid
//middleware

// For Google Login 
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("./src/Users/user.model")
Secret = process.env.SESSION_SECRET;
// Load from .env
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const frontendURL = process.env.FRONTEND_URL;



// Middleware
app.use(express.json());
app.use(cors({
  origin: [frontendURL],
  credentials: true,
}));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
    cookie: {
    httpOnly: true,
    secure: false,  // true if HTTPS
    sameSite: "lax",
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new OAuth2Strategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"]
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        username: profile.displayName, // Set a default username from the displayName
        role: 'user', // Set a default role for Google users
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}
));

passport.serializeUser((user, done) => {
  done(null, user._id); // store MongoDB user _id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // retrieve full user
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  accessType: 'offline',
  prompt: 'consent'
}));



app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: `${frontendURL}/`,
  failureRedirect: `${frontendURL}/LoginPage`
}));




app.get("/login/success", (req, res) => {
  if (req.user) {
    const role = req.user.role;
    const redirectUrl = role === 'admin'
      ? `${frontendURL}/dashboard`
      : `${frontendURL}/UserDashboard`;

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: req.user._id,
        displayName: req.user.username || req.user.displayName,
        email: req.user.email,
        image: req.user.image || 'default-profile-image-url',
        role: req.user.role
      },
      redirectUrl
    });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
});




app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    // Destroy the session and clear the cookie
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Default cookie name for express-session
      res.redirect(process.env.FRONTEND_URL);    });
  });
});


// Routes
const designRoutes = require('./src/Designs/Design.route')
const consultantRoutes = require("./src/ConsultantFrom/Consultant.Route")
const projectRoutes = require("./src/Projects/Project.route")
const userRoute = require("./src/Users/user.route")
const contactRoutes = require("./src/ContactForm/ContactRoute")
const StyleFinderRoutes  = require("./src/StyleFinder/StyleFinder.route")
// const adminRoutes = require("./src/Users/user.route")
 // Now mount routes AFTER DB connection is ready
  app.use('/api/designs', designRoutes);
  app.use('/api/Consultants', consultantRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/auth', userRoute);
app.use("/api/style-finder", StyleFinderRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB Connected Successfully !!!");

 
  // Root route (optional)
  app.get('/', (req, res) => {
    res.send('Welcome to JD Studio Server!');
  });

  // Start listening
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

main().catch(err => console.log(err));