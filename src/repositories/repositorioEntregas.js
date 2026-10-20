/**
 * Contrato IEntregasRepository
 *
 * @interface
 *
 * listarTodos(filtros?) -> Entrega[]
 * buscarPorId(id) -> Entrega | null
 * criar(dados) -> Entrega
 * atualizar(id, dados) -> Entrega | null
 */
export class EntregasRepository {
  constructor(database) {
    this.db = database;
  }

  /**
   * Lista todas as entregas, permitindo filtros combinados.
   *
   * @param {Object} filtros
   * @returns {Array}
   */
  listarTodos(filtros = {}) {
    let entregas = this.db.entregas;

    if (filtros.status) {
      entregas = entregas.filter(
        entrega => entrega.status === filtros.status
      );
    }

    if (filtros.motoristaId !== undefined) {
      entregas = entregas.filter(
        entrega => entrega.motoristaId === Number(filtros.motoristaId)
      );
    }

    return entregas;
  }

  /**
   * Busca uma entrega pelo ID.
   *
   * @param {number|string} id
   * @returns {Object|null}
   */
  buscarPorId(id) {
    return (
      this.db.entregas.find(
        entrega => entrega.id === Number(id)
      ) || null
    );
  }

  /**
   * Procura entrega ativa com mesma descrição,
   * origem e destino.
   *
   * @param {string} descricao
   * @param {string} origem
   * @param {string} destino
   * @returns {Object|undefined}
   */
  buscarDuplicataAtiva(descricao, origem, destino) {
    return this.db.entregas.find(
      entrega =>
        entrega.descricao === descricao &&
        entrega.origem === origem &&
        entrega.destino === destino &&
        entrega.status !== 'ENTREGUE' &&
        entrega.status !== 'CANCELADA'
    );
  }

  /**
   * Cria uma nova entrega.
   *
   * @param {Object} dados
   * @returns {Object}
   */
  criar(dados) {
    const novaEntrega = {
      id: this.db.proximoId++,
      descricao: dados.descricao,
      origem: dados.origem,
      destino: dados.destino,
      status: 'CRIADA',
      motoristaId: null,
      historico: [
        {
          data: new Date().toISOString(),
          descricao: 'Entrega criada'
        }
      ]
    };

    this.db.entregas.push(novaEntrega);

    return novaEntrega;
  }

  /**
   * Atualiza uma entrega existente.
   *
   * @param {number|string} id
   * @param {Object} dados
   * @returns {Object|null}
   */
  atualizar(id, dados) {
    const indice = this.db.entregas.findIndex(
      entrega => entrega.id === Number(id)
    );

    if (indice === -1) {
      return null;
    }

    this.db.entregas[indice] = {
      ...this.db.entregas[indice],
      ...dados
    };

    return this.db.entregas[indice];
  }
}