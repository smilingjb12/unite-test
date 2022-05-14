/* eslint-disable @typescript-eslint/no-var-requires */
const cors = require('cors');
import express, { Application } from 'express';
import path from 'path';
import { Request } from './db/config';
require('dotenv').config();

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.PORT || '3001';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../build/'), { maxAge: 0 })
);

app.get('/api/locations', async (req, res) => {
  console.log('returning locations');
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
  res.sendFile(frontendAppPath);
});

app.listen(PORT, async () => {
  await Request.sync({ alter: true });
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;
