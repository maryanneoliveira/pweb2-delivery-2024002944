/**
 * Contrato IMotoristasRepository
 *
 * @interface
 *
 * listarTodos() -> Motorista[]
 * buscarPorId(id) -> Motorista | null
 * buscarPorCpf(cpf) -> Motorista | null
 * criar(dados) -> Motorista
 */
export class MotoristasRepository {
  constructor(database) {
    this.db = database;
  }

  /**
   * Lista todos os motoristas.
   *
   * @returns {Array}
   */
  listarTodos() {
    return this.db.motoristas;
  }

  /**
   * Busca motorista pelo ID.
   *
   * @param {number|string} id
   * @returns {Object|null}
   */
  buscarPorId(id) {
    return (
      this.db.motoristas.find(
        motorista => motorista.id === Number(id)
      ) || null
    );
  }

  /**
   * Busca motorista pelo CPF.
   *
   * @param {string} cpf
   * @returns {Object|null}
   */
  buscarPorCpf(cpf) {
    return (
      this.db.motoristas.find(
        motorista => motorista.cpf === cpf
      ) || null
    );
  }

  /**
   * Cria um novo motorista.
   *
   * @param {Object} dados
   * @returns {Object}
   */
  criar(dados) {
    const novoMotorista = {
      id: this.db.proximoMotoristaId++,
      nome: dados.nome,
      cpf: dados.cpf,
      placaVeiculo: dados.placaVeiculo || null,
      status: 'ATIVO'
    };

    this.db.motoristas.push(novoMotorista);

    return novoMotorista;
  }
}