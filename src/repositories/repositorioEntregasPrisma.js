
import { prisma } from '../config/database.js';

export class RepositorioEntregasPrisma {

  // Listar todas as entregas 
  async listarTodos(filtros = {}) {
    const where = {
      ...(filtros.status && {
        status: filtros.status
      }),
      ...(filtros.motoristaId !== undefined && {
        motoristaId: Number(filtros.motoristaId)
      })
    };

    const entregas = await prisma.entrega.findMany({
      where,
      include: {
        historico: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    });

    return entregas.map(entrega => ({
      ...entrega,
      historico: entrega.historico.map(evento => ({
        data: evento.data.toISOString(),
        descricao: evento.descricao
      }))
    }));
  }

  // Buscar uma entrega por ID
  async buscarPorId(id) {
    const entrega = await prisma.entrega.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        historico: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    });

    if (!entrega) {
      return null;
    }

    return {
      ...entrega,
      historico: entrega.historico.map(evento => ({
        data: evento.data.toISOString(),
        descricao: evento.descricao
      }))
    };
  }

  // Verificar duplicidade ativa
  async buscarDuplicataAtiva(descricao, origem, destino) {
    const entrega = await prisma.entrega.findFirst({
      where: {
        descricao,
        origem,
        destino,
        status: {
          notIn: ['ENTREGUE', 'CANCELADA']
        }
      }
    });

    return entrega ?? undefined;
  }

  // Criar uma nova entrega 
  async criar(dados) {
    const entrega = await prisma.entrega.create({
      data: {
        descricao: dados.descricao,
        origem: dados.origem,
        destino: dados.destino,
        status: 'CRIADA',
        historico: {
          create: {
            descricao: 'Entrega criada'
          }
        }
      },
      include: {
        historico: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    });

    return {
      ...entrega,
      historico: entrega.historico.map(evento => ({
        data: evento.data.toISOString(),
        descricao: evento.descricao
      }))
    };
  }

  // Atualizar uma entrega
  async atualizar(id, dados) {
    const entrega = await this.buscarPorId(id);

    if (!entrega) {
      return null;
    }

    const dadosAtualizacao = {
      ...(dados.descricao !== undefined && {
        descricao: dados.descricao
      }),
      ...(dados.origem !== undefined && {
        origem: dados.origem
      }),
      ...(dados.destino !== undefined && {
        destino: dados.destino
      }),
      ...(dados.status !== undefined && {
        status: dados.status
      }),
      ...(dados.motoristaId !== undefined && {
        motoristaId: dados.motoristaId
      })
    };

    // Identificar os novos eventos do histórico
    if (Array.isArray(dados.historico)) {
      const quantidadeExistente = entrega.historico.length;

      const novosEventos = dados.historico.slice(
        quantidadeExistente
      );

      if (novosEventos.length > 0) {
        dadosAtualizacao.historico = {
          create: novosEventos.map(evento => ({
            data: new Date(evento.data),
            descricao: evento.descricao
          }))
        };
      }
    }

    await prisma.entrega.update({
      where: {
        id: Number(id)
      },
      data: dadosAtualizacao
    });

    return await this.buscarPorId(id);
  }

}
