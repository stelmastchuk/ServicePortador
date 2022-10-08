import { IPortadorRepository } from "@repositories/Repository/IPortadorRepository";
import { cpf as cpfvalidator } from "cpf-cnpj-validator";
import { SNS } from "aws-sdk";
import { AppError } from "src/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class PortadorCreateUseCase {
  constructor(
    @inject("PortadorRepository")
    private portadorRepository: IPortadorRepository
  ) {}

  async execute(
    cpf: string,
    name: string,
    email: string,
    issuerId: string
  ): Promise<boolean> {
    console.log("Execute Use Case");

    const cpfValido = cpfvalidator.isValid(cpf);

    if (!cpfValido) {
      throw new AppError("Cpf invalid!");
    }

    const cpfformatado = cpfvalidator.format(cpf);

    const portador = await this.portadorRepository.findByCpf(cpfformatado);

    if (portador) {
      throw new AppError("Portador already exists!");
    }

    await this.portadorRepository.create({
      cpf: cpfformatado,
      name: name,
      email: email,
      issuerId: issuerId,
    });

    await this.snsService(cpfformatado, issuerId, email, name);

    return true;
  }

  private async snsService(
    cpf: string,
    issuerId: string,
    email: string,
    name: string
  ): Promise<void> {
    const sns = new SNS({ region: "us-east-2" });
    const msg = { cpf: cpf, email: email, issuerId: issuerId, name: name };
    await sns
      .publish({
        TopicArn: `arn:aws:sns:us-east-2:532362042466:create-account`,
        Subject: "Create Account",
        Message: `${JSON.stringify(msg)}`,
      })
      .promise();
  }
}

export { PortadorCreateUseCase };
