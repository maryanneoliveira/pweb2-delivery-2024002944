import express from 'express';

import {
  rotasEntregas,
  rotasMotoristas
} from './src/routes/index.js';

const app = express();

app.use(express.json());


// Health check
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok' })
);


// Rotas
app.use(
  '/api/entregas',
  rotasEntregas
);

app.use(
  '/api/motoristas',
  rotasMotoristas
);


// 404
app.use((req, res) =>
  res
    .status(404)
    .json({ erro: 'recurso não encontrado' })
);


const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    `Delivery Tracker rodando em http://localhost:${PORT}`
  )
);