import dynamoose from "dynamoose"
import { ModelType } from 'dynamoose/dist/General'
import { Portador } from 'src/entities/Portador'
import { v4 as uuid } from 'uuid';

const schema = new dynamoose.Schema({
    portadorId: {
        type: String,
        hashKey: true,
        default: uuid,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        index: {
            global: true,
            name: "cpf"
        }
    },
    issuerId: {
        type: String,
        required: true,
        index: {
            global: true,
            name: "issuerId"
        }
    },
    "name": String,
    "email": String
}, {
    "saveUnknown": true,
    "timestamps": true,
});

export const PortadorRepositoryModel: ModelType<Portador> = dynamoose.model<Portador>("Portador", schema, {
    throughput: 'ON_DEMAND',
})

