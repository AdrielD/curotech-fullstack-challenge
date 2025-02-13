"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../errors");
const userParams = (req, res) => {
    const { user_id: userId } = req.params;
    if (userId === null || isNaN(Number(userId)))
        throw new errors_1.InvalidParamError(`userId=${userId}`);
    return { userId: Number(userId) };
};
const userInventoryParams = (req, res) => {
    const { user_id: userId, item_id: itemId } = req.params;
    if (userId === null || isNaN(Number(userId)))
        throw new errors_1.InvalidParamError(`userId=${userId}`);
    if (itemId === null || isNaN(Number(itemId)))
        throw new errors_1.InvalidParamError(`itemId=${itemId}`);
    return { userId: Number(userId), itemId: Number(itemId) };
};
const itemParams = (req, res) => {
    const { name, availableQty, price } = req.body;
    if (name === null || name === '')
        throw new errors_1.InvalidParamError(`name=${name}`);
    if (availableQty === null || isNaN(Number(availableQty)))
        throw new errors_1.InvalidParamError(`availableQty=${availableQty}`);
    if (price === null || isNaN(Number(price)))
        throw new errors_1.InvalidParamError(`price=${price}`);
    return { name, availableQty: Number(availableQty), price: Number(price) };
};
const inventoryController = (db) => {
    const router = (0, express_1.Router)();
    router.get('/user/:user_id/inventory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = userParams(req, res);
            const allItems = yield db.item.findMany({ where: { ownerId: userId } });
            res.json(allItems);
        }
        catch (err) {
            next(err);
        }
    }));
    router.get('/user/:user_id/inventory/:item_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, itemId } = userInventoryParams(req, res);
            const item = yield db.item.findUnique({ where: { id: itemId, ownerId: userId } });
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/user/:user_id/inventory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = userParams(req, res);
            const { name, availableQty, price } = itemParams(req, res);
            const newItem = yield db.item.create({
                data: { name, availableQty: availableQty, price: price, ownerId: userId
                }
            });
            res.status(201);
            res.json(newItem);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put('/user/:user_id/inventory/:item_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, itemId } = userInventoryParams(req, res);
            const { name, availableQty, price } = itemParams(req, res);
            const item = yield db.item.update({
                where: { id: itemId, ownerId: userId },
                data: { name, availableQty: availableQty, price: price }
            });
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }));
    router.delete('/user/:user_id/inventory/:item_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, itemId } = userInventoryParams(req, res);
            const item = yield db.item.delete({ where: { id: itemId, ownerId: userId } });
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.default = inventoryController;
