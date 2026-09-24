import { ErroAplicacao } from '../utils/erros.js';

export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  listar(filtros) {
    return this.repository.buscarTodas(filtros);
  }

  obterPorId(id) {
    const entrega = this.repository.buscarPorId(id);
    if (!entrega) {
      throw new ErroAplicacao('Entrega não encontrada', 404);
    }
    return entrega;
  }

  criar(dados) {
    const { descricao, origem, destino } = dados;

    if (!descricao || !origem || !destino) {
      throw new ErroAplicacao('Campos obrigatórios faltando: descricao, origem ou destino', 400);
    }

    if (origem === destino) {
      throw new ErroAplicacao('A origem não pode ser igual ao destino', 400);
    }

    const duplicada = this.repository.buscarDuplicataAtiva(descricao, origem, destino);
    if (duplicada) {
      throw new ErroAplicacao('Já existe uma entrega ativa com mesma descrição, origem e destino', 409);
    }

    return this.repository.criar({ descricao, origem, destino });
  }

  avancar(id) {
    const entrega = this.obterPorId(id);

    if (entrega.status === 'CRIADA') {
      entrega.status = 'EM_TRANSITO';
    } else if (entrega.status === 'EM_TRANSITO') {
      entrega.status = 'ENTREGUE';
    } else {
      throw new ErroAplicacao('Transição de estado inválida', 422);
    }

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: `Status alterado para ${entrega.status}`
    });

    return this.repository.atualizar(entrega);
  }

  cancelar(id) {
    const entrega = this.obterPorId(id);

    if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
      throw new ErroAplicacao('Não é possível cancelar entregas finalizadas ou canceladas', 422);
    }

    entrega.status = 'CANCELADA';
    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: 'Entrega cancelada'
    });

    return this.repository.atualizar(entrega);
  }

  obterHistorico(id) {
    const entrega = this.obterPorId(id);
    return entrega.historico;
  }
}