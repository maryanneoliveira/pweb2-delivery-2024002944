export class EntregasRepository {
  constructor(database) {
    this.db = database;
  }

  buscarTodas(filtros = {}) {
    if (filtros.status) {
      return this.db.entregas.filter(e => e.status === filtros.status);
    }
    return this.db.entregas;
  }

  buscarPorId(id) {
    return this.db.entregas.find(e => e.id === Number(id));
  }

  buscarDuplicataAtiva(descricao, origem, destino) {
    return this.db.entregas.find(
      e =>
        e.descricao === descricao &&
        e.origem === origem &&
        e.destino === destino &&
        e.status !== 'ENTREGUE' &&
        e.status !== 'CANCELADA'
    );
  }

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

  atualizar(entrega) {
    const indice = this.db.entregas.findIndex(e => e.id === entrega.id);
    if (indice !== -1) {
      this.db.entregas[indice] = entrega;
      return this.db.entregas[indice];
    }
    return null;
  }
}