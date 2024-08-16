import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import proyecto from './routes/proyecto';
import empleado from './routes/empleado';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/proyecto', proyecto);
app.use('/empleado', empleado);


const port = process.env.SERVER_PORT || 3000;

app.get('/', (_req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
