import { ErroAplicacao } from '../utils/erros.js';

export class MotoristasService {
  constructor(motoristasRepository, entregasRepository) {
    this.motoristasRepository = motoristasRepository;
    this.entregasRepository = entregasRepository;
  }

  listar() {
    return this.motoristasRepository.listarTodos();
  }

  obterPorId(id) {
    const motorista =
      this.motoristasRepository.buscarPorId(id);

    if (!motorista) {
      throw new ErroAplicacao(
        'Motorista não encontrado',
        404
      );
    }

    return motorista;
  }

  criar(dados) {
    const { nome, cpf, placaVeiculo } = dados;

    if (!nome || !cpf) {
      throw new ErroAplicacao(
        'Campos obrigatórios faltando: nome ou cpf',
        400
      );
    }

    const motoristaExistente =
      this.motoristasRepository.buscarPorCpf(cpf);

    if (motoristaExistente) {
      throw new ErroAplicacao(
        'Já existe um motorista cadastrado com este CPF',
        409
      );
    }

    return this.motoristasRepository.criar({
      nome,
      cpf,
      placaVeiculo
    });
  }

  obterEntregas(id, filtros = {}) {
    const motorista = this.obterPorId(id);

    return this.entregasRepository.listarTodos({
      ...filtros,
      motoristaId: motorista.id
    });
  }
}