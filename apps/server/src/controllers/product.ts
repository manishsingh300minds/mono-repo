import { Request, Response } from "express";
import db from "../../db";

export const getProducts = async (req: Request, res: Response) => {
	console.log("getProducts", req);
	const products = await db.product.findMany();
	res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await db.product.findFirst({
		where: { product_id: Number(id) },
	});
	res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
	const product = await db.product.create({
		data: req.body,
	});
	res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatedProduct = await db.product.update({
		where: { product_id: Number(id) },
		data: req.body,
	});
	res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	await db.product.delete({
		where: { product_id: Number(id) },
	});
	res.status(204).send();
};
