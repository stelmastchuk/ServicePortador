import { Portador } from "src/entities/Portador";

export const mapPortador = (portador: any): Partial<Portador> | undefined => {
  const portadorformat = portador[0]
    ? {
        portadorId: portador[0].portadorId,
        name: portador[0].name,
        cpf: portador[0].cpf,
        createdAt: portador[0].createdAt,
        updatedAt: portador[0].updatedAt,
      }
    : undefined;

  return portadorformat;
};
