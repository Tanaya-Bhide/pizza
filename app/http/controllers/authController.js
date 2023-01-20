const User = require("../../models/user");
const bcrypt = require("bcrypt");
const user = require("../../models/user");
const passport = require("passport");
// hello i am tanaya
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
    postLogin(req, res, next) {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "All fields are required");
        req.flash("email", email);
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect("/");
        });
      })(req, res, next);
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      //validate
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: name,
        email: email,
        password: hashedpassword,
      });
      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/register");
        });
      console.log(req.body);
    },

    logout(req, res) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    },
  };
}

module.exports = authController;
