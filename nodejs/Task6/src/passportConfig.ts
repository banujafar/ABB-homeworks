import bcrypt from "bcrypt";
import { Strategy as localStrategy } from "passport-local";
import { User } from "./entities/User.entity.ts";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";

export const initialize = (passport: any) => {
  passport.serializeUser(function (user: User, done: any) {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function (user: User, done: any) {
    done(null, user);
  });
  passport.use(
    "signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.create({ email, password });

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOneBy({ email });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          const encrypted = user.password;
          const pswdSame = await bcrypt.compare(password, encrypted);
          if (!pswdSame) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: "SECRET",
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
      },
      async (token: any, done: Function) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
