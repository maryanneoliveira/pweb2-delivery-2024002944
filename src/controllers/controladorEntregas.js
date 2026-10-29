export class EntregasController {
  constructor(service) {
    this.service = service;
  }
  listar = async (req, res) => {
    try {
      const entregas = await this.service.listar(req.query);
      return res.render("entregas/index", {
        titulo: "Entregas",
        entregas,
        statusSelecionado: req.query.status || "",
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
  obterPorId = async (req, res) => {
    try {
      const entrega = await this.service.obterPorId(req.params.id);
      const motoristas = await this.service.motoristasRepository.listarTodos();
      return res.render("entregas/show", {
        titulo: "Detalhes da entrega",
        entrega,
        motoristas,
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
  criar = async (req, res) => {
    try {
      const entrega = await this.service.criar(req.body);
      req.flash("sucesso", "Entrega cadastrada com sucesso.");
      return res.redirect("/entregas/" + entrega.id);
    } catch (erro) {
      return res
        .status(
          erro.codigoStatus && erro.codigoStatus < 500
            ? erro.codigoStatus
            : 500,
        )
        .render("entregas/new", {
          titulo: "Nova Entrega",
          erros: [erro.message],
          dados: req.body,
        });
    }
  };
  avancar = async (req, res) => {
    try {
      await this.service.avancar(req.params.id);
      req.flash("sucesso", "Status da entrega atualizado.");
    } catch (erro) {
      req.flash("erro", erro.message);
    }
    return res.redirect("/entregas/" + req.params.id);
  };
  cancelar = async (req, res) => {
    try {
      await this.service.cancelar(req.params.id);
      req.flash("sucesso", "Entrega cancelada.");
    } catch (erro) {
      req.flash("erro", erro.message);
    }
    return res.redirect("/entregas/" + req.params.id);
  };
  atribuir = async (req, res) => {
    try {
      await this.service.atribuir(req.params.id, req.body);
      req.flash("sucesso", "Motorista atribuído com sucesso.");
    } catch (erro) {
      req.flash("erro", erro.message);
    }
    return res.redirect("/entregas/" + req.params.id);
  };
  obterHistorico = async (req, res) => {
    try {
      const historico = await this.service.obterHistorico(req.params.id);
      return res.render("entregas/historico", {
        titulo: "Histórico da entrega",
        historico,
        id: req.params.id,
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
}
