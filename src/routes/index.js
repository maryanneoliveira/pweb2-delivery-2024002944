import { Database } from '../database/bancoDeDados.js';

import { EntregasRepository } from '../repositories/repositorioEntregas.js';
import { MotoristasRepository } from '../repositories/repositorioMotoristas.js';

import { EntregasService } from '../services/servicoEntregas.js';
import { MotoristasService } from '../services/servicoMotoristas.js';

import { EntregasController } from '../controllers/controladorEntregas.js';
import { MotoristasController } from '../controllers/controladorMotoristas.js';

import { criarRotasEntregas } from './rotasEntregas.js';
import { criarRotasMotoristas } from './rotasMotoristas.js';


// ==============================
// COMPOSITION ROOT
// ==============================

// Banco compartilhado
const database = new Database();


// Repositories
const entregasRepository =
  new EntregasRepository(database);

const motoristasRepository =
  new MotoristasRepository(database);


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