import { Request, Response } from "express";
import db from "../../db";
import { internalServerErrorResponse, notFoundErrorResponse, successResponseData, successResponseWithoutData } from "../utils/response";
import { ResponseCode } from "../utils/enum";

export const getProducts = async (req: Request, res: Response) => {
  try{
    const products = await db.product.findMany();
		
		return successResponseData({res, data: products})
	} catch(error) {
		if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
	}
};

export const getProduct = async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const product = await db.product.findFirst({
      where: { product_id: Number(id) },
    });
  
    if(!product){
      return notFoundErrorResponse(res)
    }
    return successResponseData({res, data: product})
  } catch (error){
		if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try{
    const product = await db.product.create({
      data: {...req.body, created_by_id: req.admin.admin_id},
    });

    return successResponseData({res, data: product, status: ResponseCode.SUCCESS_NEW_RESOURCE})
  } catch (error) {
    if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await db.product.update({
      where: { product_id: Number(id) },
      data: req.body,
    });
    return successResponseData({res, data: updatedProduct})
  } catch (error){
    if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    await db.product.delete({
      where: { product_id: Number(id) },
    });

    return successResponseWithoutData({res});
  } catch (error) {
    if (error instanceof Error) {
			console.error("Error message:", error.message);
		}
		return internalServerErrorResponse(res);
  }
};
