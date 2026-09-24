import { Router } from 'express';
import { Database } from '../database/bancoDeDados.js';
import { EntregasRepository } from '../repositories/repositorioEntregas.js';
import { EntregasService } from '../services/servicoEntregas.js';
import { EntregasController } from '../controllers/controladorEntregas.js';

// Composition root (Injeção de dependência)
const database = new Database();
const repository = new EntregasRepository(database);
const service = new EntregasService(repository);
const controller = new EntregasController(service);

const rotasEntregas = Router();

rotasEntregas.post('/', controller.criar);
rotasEntregas.get('/', controller.listar);
rotasEntregas.get('/:id', controller.obterPorId);
rotasEntregas.patch('/:id/avancar', controller.avancar);
rotasEntregas.patch('/:id/cancelar', controller.cancelar);
rotasEntregas.get('/:id/historico', controller.obterHistorico);

export { rotasEntregas };