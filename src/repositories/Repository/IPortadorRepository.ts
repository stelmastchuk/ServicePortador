import { Portador } from "src/entities/Portador";

interface IPortadorRepository {
  create(entity: Partial<Portador>): Promise<Partial<Portador>>;
  findByCpf(cpf: string): Promise<Partial<Portador> | undefined>;
  delete(portadorId: string): Promise<void>;
}

export { IPortadorRepository };
