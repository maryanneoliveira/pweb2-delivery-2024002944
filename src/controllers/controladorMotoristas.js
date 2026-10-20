
export class MotoristasController {

  constructor(service) {
    this.service = service;
  }

  // ── READ: Listar todos os motoristas ──────────────────
  listar = async (req, res) => {
    try {
      const resultado = await this.service.listar();

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── READ: Buscar motorista por ID ─────────────────────
  obterPorId = async (req, res) => {
    try {
      const resultado = await this.service.obterPorId(
        req.params.id
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── CREATE: Cadastrar um novo motorista ───────────────
  criar = async (req, res) => {
    try {
      const resultado = await this.service.criar(
        req.body
      );

      return res.status(201).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── READ: Consultar entregas de um motorista ──────────
  obterEntregas = async (req, res) => {
    try {
      const resultado = await this.service.obterEntregas(
        req.params.id,
        req.query
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

}
