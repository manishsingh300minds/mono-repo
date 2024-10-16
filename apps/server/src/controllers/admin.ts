import { Request, Response } from "express";
import db from "../../db";
import { hash, hashCompare } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import {
	errorResponseWithoutData,
	internalServerErrorResponse,
	successResponseData,
} from "../utils/response";
import { ResponseCode } from "../utils/enum";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const admin = await db.admin.findUnique({
			where: {
				email,
				active: true,
			},
		});

		if (!admin) {
			return errorResponseWithoutData({ res, message: "Invalid email" });
		}

		const is_password_valid = await hashCompare(password, admin.password);
		if (!is_password_valid) {
			return errorResponseWithoutData({ res, message: "Invalid password" });
		}

		const token = generateToken({
			admin_id: admin.admin_id,
			email: admin.email,
			first_name: admin.first_name,
			last_name: admin.last_name,
		});

		return successResponseData({
			res,
			data: {
				admin_id: admin.admin_id,
				email: admin.email,
				first_name: admin.first_name,
				last_name: admin.last_name,
			},
			message: "Login Successful",
			extras: { token },
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error message:", error.message); // Log error message safely
		}
		return internalServerErrorResponse(res);
	}
};

export const createAdmin = async (req: Request, res: Response) => {
	try {
		const { email, password, first_name, last_name } = req.body;
		const hashed_password = await hash(password);

		const admin = await db.admin.create({
			data: {
				email,
				password: hashed_password,
				first_name,
				last_name,
			},
			select: {
				admin_id: true,
				email: true,
				first_name: true,
				last_name: true,
			},
		});

		return successResponseData({
			res,
			data: admin,
			status: ResponseCode.SUCCESS_NEW_RESOURCE,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error message:", error.message); // Log error message safely
		}
		return internalServerErrorResponse(res);
	}
};
