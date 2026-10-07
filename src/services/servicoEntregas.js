import { ErroAplicacao } from '../utils/erros.js';

export class EntregasService {
  constructor(entregasRepository, motoristasRepository) {
    this.repository = entregasRepository;
    this.motoristasRepository = motoristasRepository;
  }

  listar(filtros) {
    return this.repository.listarTodos(filtros);
  }

  obterPorId(id) {
    const entrega = this.repository.buscarPorId(id);

    if (!entrega) {
      throw new ErroAplicacao(
        'Entrega não encontrada',
        404
      );
    }

    return entrega;
  }

  criar(dados) {
    const { descricao, origem, destino } = dados;

    if (!descricao || !origem || !destino) {
      throw new ErroAplicacao(
        'Campos obrigatórios faltando: descricao, origem ou destino',
        400
      );
    }

    if (origem === destino) {
      throw new ErroAplicacao(
        'A origem não pode ser igual ao destino',
        400
      );
    }

    const duplicada =
      this.repository.buscarDuplicataAtiva(
        descricao,
        origem,
        destino
      );

    if (duplicada) {
      throw new ErroAplicacao(
        'Já existe uma entrega ativa com mesma descrição, origem e destino',
        409
      );
    }

    return this.repository.criar({
      descricao,
      origem,
      destino
    });
  }

  avancar(id) {
    const entrega = this.obterPorId(id);

    if (entrega.status === 'CRIADA') {
      entrega.status = 'EM_TRANSITO';
    } else if (entrega.status === 'EM_TRANSITO') {
      entrega.status = 'ENTREGUE';
    } else {
      throw new ErroAplicacao(
        'Transição de estado inválida',
        422
      );
    }

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: `Status alterado para ${entrega.status}`
    });

    return this.repository.atualizar(
      entrega.id,
      entrega
    );
  }

  cancelar(id) {
    const entrega = this.obterPorId(id);

    if (
      entrega.status === 'ENTREGUE' ||
      entrega.status === 'CANCELADA'
    ) {
      throw new ErroAplicacao(
        'Não é possível cancelar entregas finalizadas ou canceladas',
        422
      );
    }

    entrega.status = 'CANCELADA';

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: 'Entrega cancelada'
    });

    return this.repository.atualizar(
      entrega.id,
      entrega
    );
  }

  atribuir(id, dados) {
    const entrega = this.obterPorId(id);

    if (entrega.status !== 'CRIADA') {
      throw new ErroAplicacao(
        'Motorista só pode ser atribuído a uma entrega com status CRIADA',
        422
      );
    }

    const motorista =
      this.motoristasRepository.buscarPorId(
        dados.motoristaId
      );

    if (!motorista) {
      throw new ErroAplicacao(
        'Motorista não encontrado',
        404
      );
    }

    if (motorista.status !== 'ATIVO') {
      throw new ErroAplicacao(
        'Motorista inativo não pode ser atribuído à entrega',
        422
      );
    }

    entrega.motoristaId = motorista.id;

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: `Motorista ${motorista.id} atribuído à entrega`
    });

    return this.repository.atualizar(
      entrega.id,
      entrega
    );
  }

  obterHistorico(id) {
    const entrega = this.obterPorId(id);

    return entrega.historico;
  }
}