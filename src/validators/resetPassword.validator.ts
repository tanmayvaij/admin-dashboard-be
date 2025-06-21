import { checkSchema } from "express-validator";

export const resetPasswordSchemaValidator = checkSchema({
  password: {
    notEmpty: {
      errorMessage: "Password must be provided",
    },
  },
});
