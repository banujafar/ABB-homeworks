import Router, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entities/User.entity.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { initialize } from "../passportConfig.ts";

const authorRouter = Router();
initialize(passport);

authorRouter.post(
  "/register",
  passport.authenticate("signup", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirm_password } = req.body;
    let errors: { msg: string }[] = [];

    // Check required fields
    if (!email || !password || !confirm_password) {
      errors.push({ msg: "Please fill in all fields" });
    }

    // Check passwords match
    if (password !== confirm_password) {
      errors.push({ msg: "Passwords do not match" });
    }
    // Check password length
    if (password?.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      AppDataSource.getRepository(User)
        .findOneBy({ email: email })
        .then(async (user) => {
          if (user) {
            // User exists
            errors.push({ msg: "Email is already registered" });
            res.status(400).json(errors);
          } else {
            const newUser = await User.create({
              email,
              password,
            });

            // Hash Password
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    const body = { id: user.id, email: user.email };
                    const token = jwt.sign({ user: body }, "SECRET");

                    res.json({
                      message: "Signup successful",
                      token: `Bearer ${token}`,
                    });
                  })
                  .catch((err) => console.log(err));
              })
            );
          }
        });
    }
  }
);

authorRouter.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "login",
      { session: false },
      (err: { msg: string }[], user: User, info: { message: string }) => {
        console.log(info);
        if (err) {
          console.log(err);
          // Handle any unexpected errors here
          return next(err);
        }
        if (info && info.message === "Missing credentials") {
          // Handle non-existent email address
          return res.status(401).json({ message: "Email not found" });
        }
        if (info && info.message === "Wrong Password") {
          // Handle incorrect password
          return res.status(401).json({ message: info.message });
        }
        // Handle authentication success
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          const token = jwt.sign({ sub: user.id }, "SECRET", {
            expiresIn: "1h",
          });

          res.json({
            message: "You're logged in",
            token: `Bearer ${token}`,
          });
        });
      }
    )(req, res, next);
  }
);

export default authorRouter;
