import { checkSchema } from "express-validator";

export const productSchemaValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name must be provided",
    },
    isString: {
      errorMessage: "Name should be of type string",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Password must be provided",
    },
    isString: {
      errorMessage: "Description should be of type string",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "Price must be provided",
    },
    isInt: {
      errorMessage: "Description should be of type int",
    },
  },
});
