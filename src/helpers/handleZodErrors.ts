/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import HttpStatus from 'http-status-codes';

export const handleZodErrors = (err: any, res: Response) =>{

    // mapping from the zod errors response
    const issues = err?.issues?.map((error: any) =>{
        return {
            message: error.message,
            path: error.path.join(' '),
            type: error.type,
        }
    })

    // response
    res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Validation Error',
        statusCode: HttpStatus.BAD_REQUEST,
        error: issues,
        stack: err.stack
    });
 
}