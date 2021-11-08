import express from 'express';
import winston from 'winston';

import { UsersRouter } from './users/routes/users';
import { DEFAULT_PORT } from './consts/config';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const app = express();

app.listen(DEFAULT_PORT, () => logger.info('server is started'));
app.use(express.json());
app.use('/users', UsersRouter);
app.get('/', (req, res) => res.send('API is alive'));
app.use(handleErrors);

function handleErrors(error, req, res, next) {
  logger.error(error.message);
  res.status(500).send('Something went wrong...');
  next();
}
