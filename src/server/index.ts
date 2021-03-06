/* eslint-disable @typescript-eslint/no-var-requires */
const cors = require('cors');
import compression from "compression";
import express, { Application } from 'express';
import path from 'path';
import { Request } from './db/config';
import { setLongTermCache, setNoCache } from './utils';
require('dotenv').config();

const PORT: string = process.env.PORT || '3001';

const app: Application = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(
  express.static(path.resolve(__dirname, '../../build/'), {
    extensions: ['html'],
    setHeaders(res, path) {
      if (path.match(/(\.html|\/sw\.js)$/)) {
        setNoCache(res);
        return;
      }

      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        setLongTermCache(res);
      }
    }
  })
);

app.get('/api/locations', async (req, res) => {
  res.send(await Request.findAll());
});

app.post('/api/locations', async (req, res) => {
  const request = req.body;
  const existingEntry = await Request.findByPk(request.id);
  if (existingEntry) {
    await Request.update(request, {
      where: {
        id: request.id
      }
    });
  } else {
    await Request.create(request);
  }

  res.json({ ok: true });
});

app.get('*', (req: any, res: any) => {
  const frontendAppPath = path.resolve(__dirname, '../../build/index.html');
  setNoCache(res);
  res.sendFile(frontendAppPath);
});

app.listen(PORT, async () => {
  await Request.sync({ alter: true });
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
