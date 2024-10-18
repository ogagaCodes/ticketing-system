import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';
import routes from './routes/app.routes';
import { errorHandler } from './utils/error.handler';

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);
app.use(errorHandler);

export default app;
