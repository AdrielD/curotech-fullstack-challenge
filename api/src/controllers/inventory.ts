import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { InvalidParamError, RecordNotFound, Unauthorized } from "../errors";

const userParams = (req: Request, res: Response) => {
  const { user_id: userId } = req.params;

  if (userId === null || isNaN(Number(userId)))
    throw new InvalidParamError(`userId=${userId}`);

  return { userId: Number(userId) };
}

const userInventoryParams = (req: Request, res: Response) => {
  const { user_id: userId, item_id: itemId } = req.params;

  if (userId === null || isNaN(Number(userId)))
    throw new InvalidParamError(`userId=${userId}`);
  if (itemId === null || isNaN(Number(itemId)))
    throw new InvalidParamError(`itemId=${itemId}`);

  return { userId: Number(userId), itemId: Number(itemId) };
}

const itemParams = (req: Request, res: Response) => {
  const { name, availableQty, price } = req.body;

  if (name === null || name === '')
    throw new InvalidParamError(`name=${name}`);
  if (availableQty === null || isNaN(Number(availableQty)))
    throw new InvalidParamError(`availableQty=${availableQty}`);
  if (price === null || isNaN(Number(price)))
    throw new InvalidParamError(`price=${price}`);

  return { name, availableQty: Number(availableQty), price: Number(price) };
}

const inventoryController = (db: PrismaClient) => {
  const router = Router();

  router.get('/user/:user_id/inventory', async (req, res, next) => {
    try {
      const { userId } = userParams(req, res);
      const allItems = await db.item.findMany({ where: { ownerId: userId } });

      res.json(allItems);
    } catch(err) {
      next(err);
    }
  });

  router.get('/user/:user_id/inventory/:item_id', async (req, res, next) => {
    try {
      const { userId, itemId } = userInventoryParams(req, res);
      const item = await db.item.findUnique({ where: { id: itemId, ownerId: userId } });  

      res.json(item);
    } catch(err) {
      next(err);
    }
  });
  
  router.post('/user/:user_id/inventory', async (req, res, next) => {
    try {
      const { userId } = userParams(req, res);
      const { name, availableQty, price } = itemParams(req, res);
      const newItem = await db.item.create({
        data: { name, availableQty: availableQty, price: price, ownerId: userId
      }});

      res.status(201);
      res.json(newItem);
    } catch(err) {
      next(err);
    }
  });
  
  router.put('/user/:user_id/inventory/:item_id', async (req, res, next) => {
    try {
      const { userId, itemId } = userInventoryParams(req, res);
      const { name, availableQty, price } = itemParams(req, res);
      const item = await db.item.update({
        where: { id: itemId, ownerId: userId },
        data: { name, availableQty: availableQty, price: price }
      });

      res.json(item);
    } catch(err) {
      next(err);
    }
  });
  
  router.delete('/user/:user_id/inventory/:item_id', async (req, res, next) => {
    try {
      const { userId, itemId } = userInventoryParams(req, res);
      const item = await db.item.delete({ where: { id: itemId, ownerId: userId }});

      res.json(item);
    } catch(err) {
      next(err);
    }
  });

  return router;
};

export default inventoryController;
