import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const inventoryController = (db: PrismaClient) => {
  const router = Router();

  router.get('/user/:user_id/inventory', async (req, res) => {
    const { user_id: userId } = req.params;
    const allItems = await db.item.findMany({ where: { ownerId: Number(userId) } })
    res.json(allItems);
  });
  
  router.post('/user/:user_id/inventory', async (req, res) => {
    const { user_id: userId } = req.params;
    const { name, availableQty, price } = req.body;
    const newItem = await db.item.create({
      data: {
        name, availableQty: Number(availableQty), price: Number(price), ownerId: Number(userId)
      }});
    res.status(201);
    res.json(newItem);
  });
  
  router.put('/user/:user_id/inventory/:item_id', async (req, res) => {
    const { user_id: userId, item_id: itemId } = req.params;
    const { name, availableQty, price } = req.body;
    const item = await db.item.update({
      where: { id: Number(itemId), ownerId: Number(userId) },
      data: { name, availableQty: Number(availableQty), price: Number(price) }
    });
    res.json(item);
  });
  
  router.delete('/user/:user_id/inventory/:item_id', async (req, res) => {
    const { user_id: userId, item_id: itemId } = req.params;
    const item = await db.item.delete({ where: { id: Number(itemId), ownerId: Number(userId) }});
    res.json(item);
  });

  return router;
};

export default inventoryController;
