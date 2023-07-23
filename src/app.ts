import express from 'express';
import { SERVER_PORT } from './config/app.config';
import logger from 'morgan';
import { errorHandler } from './middlewares/error-handler.middleware';
import { router as tasksRouter } from './routes/tasks.routes';
import './config/firebase';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/tasks', tasksRouter);

// Error handler
app.use(errorHandler);

app.set('port', SERVER_PORT);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
