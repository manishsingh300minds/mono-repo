import { Request, Response } from "express";
import db from "../../db";
import { internalServerErrorResponse, successResponseData } from "../utils/response";

export const getCategories = async (req: Request, res: Response) => {
	try{
		const categories = await db.category.findMany();
		
		return successResponseData({res, data: categories})
	} catch(error) {
		if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
	}
};
