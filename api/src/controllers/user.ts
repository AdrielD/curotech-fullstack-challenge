import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { InvalidParamError, RecordNotFound } from "../errors";

const userParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id === null || isNaN(Number(id)))
    throw new InvalidParamError(`id=${id}`);

  return { id: Number(id) };
}

const userController = (db: PrismaClient) => {
  const router = Router();

  router.get('/user/:id', async (req, res, next) => {
    try {
      const { id } = userParams(req, res, next);
      const user = await db.user.findUnique({ where: { id } });
      
      if (!user) throw new RecordNotFound();

      res.json(user);
    } catch(err) {
      next(err);
    }
  });

  return router;
};

export default userController;
