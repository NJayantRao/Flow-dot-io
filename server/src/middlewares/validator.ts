import {body, validationResult} from "express-validator";

const validateResult = async function (req: any, res: any, next: any) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({errors: errors.array().map((err: any) => err.msg)});
  }
  next();
};

export const userRegistrationValidation = [
  body("username")
    .isString()
    .withMessage("User name must be a string")
    .isLength({min: 3})
    .withMessage("User name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long"),
  validateResult,
];

export const userLoginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long"),
  validateResult,
];

export const resetPasswordValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("newPassword")
    .isString()
    .withMessage("Password must be a string")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long"),
  validateResult,
];
