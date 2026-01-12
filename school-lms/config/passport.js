const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const Admin = require("../models/admin/Admin");
const Teacher = require("../models/teacher/Teacher");
const Student = require("../models/student/Student");

const { generateToken } = require("../utils/jwtUtil");

function googleStrategy(role, Model) {
  return new GoogleStrategy(
    {
      clientID: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_CLIENT_SECRET",
      callbackURL: `/auth/google/${role}/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await Model.findOne({ email });

        if (!user) {
          user = new Model({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email,
            password: "GOOGLE_LOGIN",
            role: role.toUpperCase(),
            status: role === "teacher" ? "ACTIVE" : undefined
          });
          await user.save();
        }

        const token = generateToken(user._id, role.toUpperCase());

        done(null, { token, role: role.toUpperCase() });
      } catch (err) {
        done(err, null);
      }
    }
  );
}

passport.use("google-admin", googleStrategy("admin", Admin));
passport.use("google-teacher", googleStrategy("teacher", Teacher));
passport.use("google-student", googleStrategy("student", Student));
