import { config } from '../config';
import express from 'express';
import next from 'next';
import type FetchType from 'node-fetch';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/uploads/*', async (req, res, next) => {
    const remoteResponse = await (fetch as unknown as typeof FetchType)(`${config.cmsUrl}${req.originalUrl}`);

    if (remoteResponse.status >= 400) {
      res.statusCode = 404;
      res.send();
      return;
    }

    res.writeHead(200, {});
    remoteResponse.body?.pipe(res);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
