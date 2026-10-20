
import { ErroAplicacao } from '../utils/erros.js';

export class MotoristasService {

  constructor(motoristasRepository, entregasRepository) {
    this.motoristasRepository = motoristasRepository;
    this.entregasRepository = entregasRepository;
  }

  // ── READ: Listar todos os motoristas ──────────────────
  async listar() {
    return await this.motoristasRepository.listarTodos();
  }

  // ── READ: Buscar motorista por ID ─────────────────────
  async obterPorId(id) {
    const motorista = await this.motoristasRepository.buscarPorId(id);

    if (!motorista) {
      throw new ErroAplicacao(
        'Motorista não encontrado',
        404
      );
    }

    return motorista;
  }

  // ── CREATE: Cadastrar um novo motorista ───────────────
  async criar(dados) {
    const { nome, cpf, placaVeiculo } = dados;

    if (!nome || !cpf) {
      throw new ErroAplicacao(
        'Campos obrigatórios faltando: nome ou cpf',
        400
      );
    }

    const motoristaExistente = await this.motoristasRepository.buscarPorCpf(cpf);

    if (motoristaExistente) {
      throw new ErroAplicacao(
        'Já existe um motorista cadastrado com este CPF',
        409
      );
    }

    return await this.motoristasRepository.criar({
      nome,
      cpf,
      placaVeiculo
    });
  }

  // ── READ: Listar entregas de um motorista ─────────────
  async obterEntregas(id, filtros = {}) {
    const motorista = await this.obterPorId(id);

    return await this.entregasRepository.listarTodos({
      ...filtros,
      motoristaId: motorista.id
    });
  }

}
