import { Router } from "express";
export function criarRotasEntregas(controller) {
  const router = Router();
  router.get("/", controller.listar);
  router.get("/nova", (req, res) =>
    res.render("entregas/new", {
      titulo: "Nova Entrega",
      erros: [],
      dados: {},
    }),
  );
  router.post("/", controller.criar);
  router.get("/:id", controller.obterPorId);
  router.patch("/:id/avancar", controller.avancar);
  router.patch("/:id/cancelar", controller.cancelar);
  router.patch("/:id/atribuir", controller.atribuir);
  router.get("/:id/historico", controller.obterHistorico);
  return router;
}
