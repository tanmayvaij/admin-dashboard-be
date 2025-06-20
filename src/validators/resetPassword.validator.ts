import { checkSchema } from "express-validator";

export const resetPasswordSchemaValidator = checkSchema({
  id: {
    notEmpty: {
      errorMessage: "Id must be provided",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must be provided",
    },
  },
});
