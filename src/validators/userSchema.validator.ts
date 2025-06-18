import { checkSchema } from "express-validator";
import { Role } from "../../generated/prisma";

export const userSchemaValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email must be provided",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must be provided",
    },
    isString: {
      errorMessage: "Password should be of type string",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password length should be minimum 8 characters long",
    },
  },
  role: {
    optional: true,
    isIn: {
      options: [Object.values(Role)],
      errorMessage: `Role should be one of the ${Object.values(Role).join(
        ", "
      )} `,
    },
  },
});
