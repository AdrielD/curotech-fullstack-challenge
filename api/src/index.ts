import express from 'express';
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userController from './controllers/user';
import inventoryController from './controllers/inventory';
import { GenericError, InvalidParamError, RecordNotFound, Unauthorized } from './errors';

const app = express();
app.use(cors());
app.use(express.json());

const db = new PrismaClient();
const port = 4000;

app.get('/api/health_check', (_, res) => {
  res.json({ message: 'Ahoy!' });
});

app.use(
  '/api',
  userController(db),
  inventoryController(db)
);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);

  switch (err.constructor.name) {
    case InvalidParamError.name:
      res.status(422).json({ message: err.message });
      next();
      break;
    case RecordNotFound.name:
      res.status(404).json({ message: err.message });
      next();
      break;
    case Unauthorized.name:
      res.status(401).json({ message: err.message });
      next();
      break;
    default:
      res.status(500).json({ message: new GenericError().message });
      next();
      break;
  }
});

app.listen(port, () => {
  console.log(`Started Curotech api server in http://localhost:${port}`)
});
