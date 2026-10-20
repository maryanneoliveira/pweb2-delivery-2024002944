
import { RepositorioEntregasPrisma } from '../repositories/repositorioEntregasPrisma.js';
import { RepositorioMotoristasPrisma } from '../repositories/repositorioMotoristasPrisma.js';

import { EntregasService } from '../services/servicoEntregas.js';
import { MotoristasService } from '../services/servicoMotoristas.js';

import { EntregasController } from '../controllers/controladorEntregas.js';
import { MotoristasController } from '../controllers/controladorMotoristas.js';

import { criarRotasEntregas } from './rotasEntregas.js';
import { criarRotasMotoristas } from './rotasMotoristas.js';


// ==============================
// COMPOSITION ROOT
// ==============================

// Repositories Prisma
const entregasRepository =
  new RepositorioEntregasPrisma();

const motoristasRepository =
  new RepositorioMotoristasPrisma();


// Services
const entregasService =
  new EntregasService(
    entregasRepository,
    motoristasRepository
  );

const motoristasService =
  new MotoristasService(
    motoristasRepository,
    entregasRepository
  );


// Controllers
const entregasController =
  new EntregasController(entregasService);

const motoristasController =
  new MotoristasController(motoristasService);


// Rotas
const rotasEntregas =
  criarRotasEntregas(entregasController);

const rotasMotoristas =
  criarRotasMotoristas(motoristasController);


export {
  rotasEntregas,
  rotasMotoristas
};
