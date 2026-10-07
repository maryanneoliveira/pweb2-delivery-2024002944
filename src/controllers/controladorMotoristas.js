export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  listar = (req, res) => {
    try {
      const resultado = this.service.listar();

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  obterPorId = (req, res) => {
    try {
      const resultado =
        this.service.obterPorId(req.params.id);

      return res.status(200).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  criar = (req, res) => {
    try {
      const resultado =
        this.service.criar(req.body);

      return res.status(201).json(resultado);
    } catch (erro) {
      return res
        .status(erro.codigoStatus || 500)
        .json({ erro: erro.message });
    }
  };

  obterEntregas = (req, res) => {
    try {
      const resultado =
        this.service.obterEntregas(
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