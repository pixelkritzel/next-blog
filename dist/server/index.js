"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = (0, express_1.default)();
    server.get('/uploads/*', async (req, res, next) => {
        var _a;
        const remoteResponse = await fetch(`${config_1.config.cmsUrl}${req.originalUrl}`);
        if (remoteResponse.status >= 400) {
            res.statusCode = 404;
            res.send();
            return;
        }
        res.writeHead(200, {});
        (_a = remoteResponse.body) === null || _a === void 0 ? void 0 : _a.pipe(res);
    });
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
