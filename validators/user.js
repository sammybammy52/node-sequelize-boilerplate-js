const { check, validationResult } = require("express-validator");

const validateUser = [
  check("firstName").notEmpty().withMessage("First Name is Required"),
  check("lastName").notEmpty().withMessage("Last Name is Required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("Password is Required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next();
  }
];


module.exports = { validateUser };
