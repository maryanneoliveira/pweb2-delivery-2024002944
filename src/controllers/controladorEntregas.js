
export class EntregasController {

  constructor(service) {
    this.service = service;
  }

  // ── READ: Listar entregas ─────────────────────────────
  listar = async (req, res) => {
    try {
      const resultado = await this.service.listar(req.query);

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── READ: Buscar entrega por ID ───────────────────────
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

  // ── CREATE: Cadastrar uma nova entrega ────────────────
  criar = async (req, res) => {
    try {
      const resultado = await this.service.criar(req.body);

      return res.status(201).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── UPDATE: Avançar status da entrega ─────────────────
  avancar = async (req, res) => {
    try {
      const resultado = await this.service.avancar(
        req.params.id
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── UPDATE: Cancelar uma entrega ──────────────────────
  cancelar = async (req, res) => {
    try {
      const resultado = await this.service.cancelar(
        req.params.id
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── UPDATE: Atribuir motorista à entrega ──────────────
  atribuir = async (req, res) => {
    try {
      const resultado = await this.service.atribuir(
        req.params.id,
        req.body
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  // ── READ: Consultar histórico da entrega ─────────────
  obterHistorico = async (req, res) => {
    try {
      const resultado = await this.service.obterHistorico(
        req.params.id
      );

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

}
