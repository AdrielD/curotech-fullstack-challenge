import express from 'express';
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import inventoryController from './controllers/inventory';

const app = express();
app.use(cors());
app.use(express.json());

const db = new PrismaClient();
const port = 4000;

app.get('/api/health_check', (_, res) => {
  res.json({ message: 'Ahoy!' });
});

app.use('/api', inventoryController(db));

app.listen(port, () => {
  console.log(`Started Curotech server in http://localhost:${port}`)
});
