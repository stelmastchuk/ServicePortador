import { PortadorRepositoryModel } from "@repositories/Models/portadorRepositoryModel";
import { Portador } from "src/entities/Portador";
import { mapPortador } from "src/utils/mapPortador";
import { IPortadorRepository } from "./IPortadorRepository";

class PortadorRepository implements IPortadorRepository {
  async create(entity: Partial<Portador>): Promise<Partial<Portador>> {
    return PortadorRepositoryModel.create(entity);
  }

  async findByCpf(cpf: string): Promise<Partial<Portador> | undefined> {
    const portador = await PortadorRepositoryModel.query("cpf").eq(cpf).exec();
    return mapPortador(portador);
  }

  async delete(portadorId: string): Promise<void> {
    await PortadorRepositoryModel.delete(portadorId);
  }
}

export { PortadorRepository };
