export class MotoristasController {
  constructor(service) {
    this.service = service;
  }
  listar = async (req, res) => {
    try {
      const motoristas = await this.service.listar();
      return res.render("motorista/index", {
        titulo: "Motoristas",
        motoristas,
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
  obterPorId = async (req, res) => {
    try {
      const motorista = await this.service.obterPorId(req.params.id);
      const entregas = await this.service.obterEntregas(req.params.id);
      return res.render("motorista/show", {
        titulo: "Detalhes do motorista",
        motorista,
        entregas,
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
  criar = async (req, res) => {
    try {
      const motorista = await this.service.criar(req.body);
      req.flash("sucesso", "Motorista cadastrado com sucesso.");
      return res.redirect("/motoristas/" + motorista.id);
    } catch (erro) {
      return res
        .status(
          erro.codigoStatus && erro.codigoStatus < 500
            ? erro.codigoStatus
            : 500,
        )
        .render("motorista/new", {
          titulo: "Novo Motorista",
          erros: [erro.message],
          dados: req.body,
        });
    }
  };
  obterEntregas = async (req, res) => {
    try {
      const motorista = await this.service.obterPorId(req.params.id);
      const entregas = await this.service.obterEntregas(
        req.params.id,
        req.query,
      );
      return res.render("motorista/show", {
        titulo: "Entregas do motorista",
        motorista,
        entregas,
      });
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .render("erro", { titulo: "Erro", mensagem: erro.message });
    }
  };
}
