import { checkSchema } from "express-validator";

export const updateProductSchemaValidator = checkSchema({
  name: {
    optional: true,
    isString: {
      errorMessage: "Name should be of type string",
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description should be of type string",
    },
  },
  price: {
    optional: true,
    isInt: {
      errorMessage: "Description should be of type int",
    },
  },
});
