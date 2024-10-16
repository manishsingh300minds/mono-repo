import { MetaCode, ResponseCode } from "./enum";
import { Response } from "express";

interface ResponseDataParams{
  res: Response;
  data?: any;
  status?: ResponseCode;
  code?: MetaCode;
  message?: string;
  extras?: Record<string, any>;
}

/**
 * @description This function use for format success response of rest api containing data
 * @param {ResponseDataParams} params - An object containing response parameters.
 * @returns {{data: *, meta: {message: *, code: *}}}
 */
export function successResponseData({
	res,
	data,
	status = ResponseCode.SUCCESS,
	code = MetaCode.SUCCESS,
	message = "Success",
	extras
}: ResponseDataParams) {
	const response = {
		data,
		meta: {
			code,
			message,
		},
	};
	if (extras) {
		Object.keys(extras).forEach((key) => {
			if ({}.hasOwnProperty.call(extras, key)) {
				response.meta[key] = extras[key];
			}
		});
	}
	return res.status(status).send(response);
}

/**
 * @description This function use for format success response of rest api without data
 * @param {ResponseDataParams} params - An object containing response parameters.
 * @returns {{meta: {message: *, code: *}}}
 */
export function successResponseWithoutData({
	res,
	message,
	status = ResponseCode.SUCCESS_WITHOUT_RESPONSE,
	code = MetaCode.SUCCESS,
	extras
}: ResponseDataParams) {
	const response = {
		meta: {
			code,
			message,
		},
	};
	if (extras) {
		Object.keys(extras).forEach((key) => {
			if ({}.hasOwnProperty.call(extras, key)) {
				response.meta[key] = extras[key];
			}
		});
	}

	return res.status(status).send(response);
}

/**
 * @description This function use for format error response of rest api
 * @param {ResponseDataParams} params - An object containing response parameters.
 * @returns {{data: *, meta: {message: *, code: *}}}
 */
export function errorResponseData({
	res,
	data,
	message,
	status = ResponseCode.BAD_REQUEST,
	code = MetaCode.FAIL
}: ResponseDataParams) {
	const response = {
		data,
		meta: {
			code,
			message,
		},
	};
	return res.status(status).send(response);
}

/**
 * @description This function use for format error response of rest api without data
 * @param {ResponseDataParams} params - An object containing response parameters.
 * @returns {{meta: {message: *, code: *}}}
 */
export function errorResponseWithoutData({
	res,
	message,
	status = ResponseCode.BAD_REQUEST,
	code = MetaCode.FAIL
}: ResponseDataParams){
	const response = {
		meta: {
			code,
			message,
		},
	};
	return res.status(status).send(response);
}

/**
 * @description This function use for format validation error response of rest api
 * @param res
 * @param message
 * @param code
 * @returns {{response: {code: *, message: *}}}
 */
export function validationErrorResponseData(
	res,
	message,
	status = ResponseCode.BAD_REQUEST,
	code = MetaCode.FAIL
) {
	const response = {
		data: null,
		meta: {
			code: code,
			message,
		},
	};
	return res.status(status).send(response);
}

export function internalServerErrorResponse(
	res,
	status = ResponseCode.INTERNAL_SERVER,
	code = MetaCode.FAIL
) {
	const response = {
		code: code,
		message: "Internal server error",
	};
	return res.status(status).send(response);
}

export function notFoundErrorResponse(
	res,
	message = "Not found",
	status = ResponseCode.NOT_FOUND,
	code = MetaCode.FAIL
) {
	const response = {
		code,
		message
	};
	return res.status(status).send(response);
}
