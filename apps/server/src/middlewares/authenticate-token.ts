import { Request, Response, NextFunction } from "express";
import { ResponseCode } from "../utils/enum";
import { verifyToken } from "../utils/jwt";
import { errorResponseWithoutData, internalServerErrorResponse } from "../utils/response";

/**
 * Middleware to authenticate JWT token and extract admin data
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer token'

  if (!token) {
    return errorResponseWithoutData({res,status: ResponseCode.TOKEN_INVALID, message: "Access token is missing"});
  }

  try {
    const decoded = verifyToken(token, res); // Verify the token with the secret key
    
    if(decoded){
      // Attach the decoded payload (admin data) to the request object
      (req as any).admin = decoded;

      // Proceed to the next middleware or route handler
      next();
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return internalServerErrorResponse({res,status: ResponseCode.FORBIDDEN, message: "Invalid or expired token"});
  }
};
