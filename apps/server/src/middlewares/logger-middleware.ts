import { Request, Response, NextFunction } from 'express';

// Custom logger middleware
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`\n${req.method}: ${req.url}`);
  // console.log('Headers:', req.headers);
  
  // Log the request body only if it's not a GET request (GET requests don't have a body)
  if (req.method !== 'GET') {
    console.log('BODY:', req.body);
  }
  
  // Call next() to pass the request to the next middleware or route handler
  next();
};
