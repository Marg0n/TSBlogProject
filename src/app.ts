import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import sendResponse from './utils/sendResponse';
import HttpStatus from 'http-status-codes';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// middleware
app.use('/api', router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    sendResponse(res, {
      message: 'Server is running! ⚡',
      statusCode: HttpStatus.OK,
      data: null,
    });
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next(err);
    // res.status(500).send({
    //   message: err.message || 'Something went wrong!',
    //   success: false,
    //   error: err.errors,
    //   stack: err.stack,
    // });
  }
});

// global error handler
app.use(globalErrorHandler);

// route not found
app.use('*', (req: Request, res: Response) => {
  res.status(HttpStatus.FORBIDDEN).send({
    success: false,
    message: 'Route not found!',
    status: HttpStatus.FORBIDDEN,
  });
});

// not found
app.use(notFound);

export default app;
