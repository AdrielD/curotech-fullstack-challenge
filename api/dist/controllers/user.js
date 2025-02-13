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
const userParams = (req, res, next) => {
    const { id } = req.params;
    if (id === null || isNaN(Number(id)))
        throw new errors_1.InvalidParamError(`id=${id}`);
    return { id: Number(id) };
};
const userController = (db) => {
    const router = (0, express_1.Router)();
    router.get('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = userParams(req, res, next);
            const user = yield db.user.findUnique({ where: { id } });
            if (!user)
                throw new errors_1.RecordNotFound();
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.default = userController;
