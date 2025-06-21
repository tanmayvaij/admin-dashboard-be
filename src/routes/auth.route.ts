import { Router } from "express";

import {
  loginController,
  verifyController,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth";
import { tokenCheck, validateRequestBody } from "../middlewares";
import {
  userSchemaValidator,
  resetPasswordSchemaValidator,
} from "../validators";

export const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and receive a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       404:
 *         description: No such user exists
 *       500:
 *         description: Server error
 */
authRouter
  .route("/login")
  .post(
    ...validateRequestBody(userSchemaValidator),
    userSchemaValidator,
    loginController
  );

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify the logged-in user and return their details
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clxyz1234567890
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 role:
 *                   type: string
 *                   enum: [USER, MODERATOR, ADMIN]
 *       401:
 *         description: invalid token or not provided
 *       500:
 *         description: Internal server error
 */
authRouter.route("/verify").get(tokenCheck, verifyController);

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Request a password reset link for the authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset link sent (preview in console)
 *       401:
 *         description: invalid token or not provided
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */
authRouter
  .route("/request-password-reset")
  .post(tokenCheck, requestPasswordReset);


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset the user's password using the reset token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token sent via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewSecurePassword123!
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Invalid or missing token/password
 *       500:
 *         description: Internal server error
 */
authRouter
  .route("/reset-password")
  .post(
    tokenCheck,
    ...validateRequestBody(resetPasswordSchemaValidator),
    resetPassword
  );
