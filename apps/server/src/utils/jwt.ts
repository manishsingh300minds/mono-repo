
import jwt from 'jsonwebtoken';
import { errorResponseWithoutData } from "./response";
import { ResponseCode } from "./enum";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 
const TOKEN_EXPIRY = '1h'; 

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

export const verifyToken = (token: string, res) => {
  try {
    let decoded = null;
    jwt.verify(token, JWT_SECRET, (err: any, admin) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          errorResponseWithoutData({res, status: ResponseCode.UNAUTHORIZED, message: 'Token has expired'})
          return false
        }
        errorResponseWithoutData({res, status: ResponseCode.UNAUTHORIZED, message: 'Invalid token'})
        return false
      }
      decoded = admin
    });
    return decoded;
  } catch (error) {
    console.error('Invalid Token:', error);
    return null;
  }
};
