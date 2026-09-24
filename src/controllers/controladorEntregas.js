export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  listar = (req, res) => {
    try {
      const resultado = this.service.listar(req.query);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };

  obterPorId = (req, res) => {
    try {
      const resultado = this.service.obterPorId(req.params.id);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };

  criar = (req, res) => {
    try {
      const resultado = this.service.criar(req.body);
      return res.status(201).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };

  avancar = (req, res) => {
    try {
      const resultado = this.service.avancar(req.params.id);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };

  cancelar = (req, res) => {
    try {
      const resultado = this.service.cancelar(req.params.id);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };

  obterHistorico = (req, res) => {
    try {
      const resultado = this.service.obterHistorico(req.params.id);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(erro.codigoStatus || 500).json({ erro: erro.message });
    }
  };
}