import { Admin } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      admin?: Partial<Admin>; // Adding the custom property 'admin'
    }
  }
}
