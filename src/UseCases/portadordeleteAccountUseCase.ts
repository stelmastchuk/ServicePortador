import { IPortadorRepository } from "@repositories/Repository/IPortadorRepository";
import { cpf as cpfvalidator } from "cpf-cnpj-validator";
import { inject, injectable } from "tsyringe";

@injectable()
class PortadorDeleteAccountUseCase {
  constructor(
    @inject("PortadorRepository")
    private portadorRepository: IPortadorRepository
  ) {}

  async execute(cpf: string): Promise<boolean> {
    console.log("Execute Use Case");

    const cpfValido = cpfvalidator.isValid(cpf);

    if (!cpfValido) {
      return false;
    }

    const cpfformatado = cpfvalidator.format(cpf);

    const portador = await this.portadorRepository.findByCpf(cpfformatado);

    await this.portadorRepository.delete(portador.portadorId);

    return true;
  }
}

export { PortadorDeleteAccountUseCase };
