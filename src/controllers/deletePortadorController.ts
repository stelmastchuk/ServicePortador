import { IDeletePortadorDTO } from "@repositories/DTO/ICreatePortadorDTO copy";
import { SQSEvent } from "aws-lambda";
import { PortadorDeleteAccountUseCase } from "src/UseCases/portadordeleteAccountUseCase";
import { schemaDeleteAccount } from "src/utils/joiValidation";
import { sqsEventNormalizer } from "src/utils/sqsEventNormalizer";
import { container } from "tsyringe";

class DeleteAccountController {
  async handler(event: SQSEvent): Promise<any> {
    try {
      const data = sqsEventNormalizer(event, true) as IDeletePortadorDTO;

      console.log("Teste DATA", data);

      const { error } = schemaDeleteAccount.validate({ cpf: data.cpf });

      if (error) {
        return {
          statusCode: 500,
          body: JSON.stringify(error),
          headers: { "Content-type": "application/json" },
        };
      }

      const deleteAccountUseCase = container.resolve(
        PortadorDeleteAccountUseCase
      );

      const response = await deleteAccountUseCase.execute(data.cpf);

      return {
        statusCode: 201,
        body: JSON.stringify(response),
        headers: { "Content-type": "application/json" },
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
        headers: { "Content-type": "application/json" },
      };
    }
  }
}

export { DeleteAccountController };
