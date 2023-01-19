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
  };
}

module.exports = authController;
