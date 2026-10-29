import { Router } from "express";
export function criarRotasMotoristas(controller) {
  const router = Router();
  router.get("/", controller.listar);
  router.get("/novo", (req, res) =>
    res.render("motorista/new", {
      titulo: "Novo Motorista",
      erros: [],
      dados: {},
    }),
  );
  router.post("/", controller.criar);
  router.get("/:id/entregas", controller.obterEntregas);
  router.get("/:id", controller.obterPorId);
  return router;
}
