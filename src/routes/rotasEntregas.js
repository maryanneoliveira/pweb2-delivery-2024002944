import { Router } from 'express';

export function criarRotasEntregas(controller) {
  const rotasEntregas = Router();

  rotasEntregas.post('/', controller.criar);
  rotasEntregas.get('/', controller.listar);
  rotasEntregas.get('/:id', controller.obterPorId);

  rotasEntregas.patch(
    '/:id/avancar',
    controller.avancar
  );

  rotasEntregas.patch(
    '/:id/cancelar',
    controller.cancelar
  );

  rotasEntregas.patch(
    '/:id/atribuir',
    controller.atribuir
  );

  rotasEntregas.get(
    '/:id/historico',
    controller.obterHistorico
  );

  return rotasEntregas;
}