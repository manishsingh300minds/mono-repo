import { Request, Response } from "express";
import db from "../../db";

export const getCategories = async (req: Request, res: Response) => {
	const categories = await db.category.findMany();
	res.json(categories);
};
