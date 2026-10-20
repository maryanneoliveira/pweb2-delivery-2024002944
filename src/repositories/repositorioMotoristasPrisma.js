
import { prisma } from '../config/database.js';

export class RepositorioMotoristasPrisma {

  //  READ: Listar todos os motoristas 
  async listarTodos() {
    return await prisma.motorista.findMany();
  }

  //  READ: Buscar motorista pelo ID 
  async buscarPorId(id) {
    return await prisma.motorista.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  //  READ: Buscar motorista pelo CPF 
  async buscarPorCpf(cpf) {
    return await prisma.motorista.findUnique({
      where: {
        cpf: cpf
      }
    });
  }

  //  CREATE: Cadastrar um novo motorista
  async criar(dados) {
    const novoMotorista = await prisma.motorista.create({
      data: {
        nome: dados.nome,
        cpf: dados.cpf,
        placaVeiculo: dados.placaVeiculo || null,
        status: 'ATIVO'
      }
    });

    return novoMotorista;
  }

}
