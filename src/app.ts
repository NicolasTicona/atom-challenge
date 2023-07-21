import express, { Response, Request, NextFunction } from 'express';
import { SERVER_PORT } from './config/config';
import logger from 'morgan';
import { HttpError } from 'http-errors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: 'Hello World',
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).send('Something broke!');
});

app.set('port', SERVER_PORT);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
