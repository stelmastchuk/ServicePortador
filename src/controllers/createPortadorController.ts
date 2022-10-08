import { ICreatePortadorDTO } from '@repositories/DTO/ICreatePortadorDTO'
import { AppError } from 'src/errors/AppError';
import { PortadorCreateUseCase } from 'src/UseCases/portadorCreateUseCase';
import { treatError } from 'src/utils/errors';
import { schemaCreatePortador } from 'src/utils/joiValidation';
import { container } from 'tsyringe';

class CreatePortadorController {
    
    async handler(event: any): Promise<any> {

        console.log("OLHA O EVENTO AQUI!" ,event)

        try {
            const { cpf, name, lastName, email } = JSON.parse(event.body) as ICreatePortadorDTO
            
            const issuerId = event.requestContext.authorizer.principalId as string 
             
            const { error } = schemaCreatePortador.validate({ cpf: cpf, name: name, lastName: lastName , issuerId: issuerId, email: email })
            
            if (error) {
                throw new AppError(error.message)
            }

            const portadorCreateUseCase = container.resolve(PortadorCreateUseCase);

            const response = await portadorCreateUseCase.execute(cpf, `${name} ${lastName}`, email, issuerId)

            return {
                statusCode: 201,
                body: JSON.stringify({ succes: response }),
                headers: { "Content-type": "application/json" },
            }

        } catch (err) {
            return treatError(err)
        }

    }
}

export { CreatePortadorController }