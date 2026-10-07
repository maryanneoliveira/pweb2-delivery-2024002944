import { Router } from 'express';

export function criarRotasMotoristas(controller) {
  const rotasMotoristas = Router();

  rotasMotoristas.post(
    '/',
    controller.criar
  );

  rotasMotoristas.get(
    '/',
    controller.listar
  );

  rotasMotoristas.get(
    '/:id/entregas',
    controller.obterEntregas
  );

  rotasMotoristas.get(
    '/:id',
    controller.obterPorId
  );

  return rotasMotoristas;
}