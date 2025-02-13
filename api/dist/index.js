"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./controllers/user"));
const inventory_1 = __importDefault(require("./controllers/inventory"));
const errors_1 = require("./errors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const db = new client_1.PrismaClient();
const port = 4000;
app.get('/api/health_check', (_, res) => {
    res.json({ message: 'Ahoy!' });
});
app.use('/api', (0, user_1.default)(db), (0, inventory_1.default)(db));
app.use((err, req, res, next) => {
    console.error(err.stack);
    switch (err.constructor.name) {
        case errors_1.InvalidParamError.name:
            res.status(422).json({ message: err.message });
            next();
            break;
        case errors_1.RecordNotFound.name:
            res.status(404).json({ message: err.message });
            next();
            break;
        case errors_1.Unauthorized.name:
            res.status(401).json({ message: err.message });
            next();
            break;
        default:
            res.status(500).json({ message: new errors_1.GenericError().message });
            next();
            break;
    }
});
app.listen(port, () => {
    console.log(`Started Curotech server in http://localhost:${port}`);
});
