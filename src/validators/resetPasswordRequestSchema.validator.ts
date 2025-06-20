import { checkSchema } from "express-validator";

export const resetPasswordRequestSchemaValidator = checkSchema({
  id: {
    notEmpty: {
      errorMessage: "Id must be provided",
    },
  },
});
