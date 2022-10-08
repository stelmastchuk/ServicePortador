import "reflect-metadata";
import { container } from "tsyringe";
import { IPortadorRepository } from "@repositories/Repository/IPortadorRepository";
import { PortadorDeleteAccountUseCase } from "../portadordeleteAccountUseCase";

describe("Create Portador", () => {
  const portador = {
    portadorId: "string",
    name: "teste",
    cpf: "teste",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createPortadorRepo: jest.Mocked<IPortadorRepository> = {
    create: jest.fn().mockImplementation(() => Promise.resolve(portador)),
    findByCpf: jest.fn().mockImplementation(() => Promise.resolve(portador)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(portador)),
  };

  beforeEach(() => {
    container.clearInstances();
  });

  it("should be able to create a new portador", async () => {
    const usecase = new PortadorDeleteAccountUseCase(createPortadorRepo);
    const response = await usecase.execute("42845684002");
    expect(response).toEqual(true);
  });

  it("should not be able to create Portador, if cpf invalid ", async () => {
    const createPortadorRepo: jest.Mocked<IPortadorRepository> = {
      create: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      findByCpf: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      delete: jest.fn().mockImplementation(() => Promise.resolve(portador)),
    };
    const usecase = new PortadorDeleteAccountUseCase(createPortadorRepo);
    const response = await usecase.execute("11111");
    expect(response).toEqual(false);
  });
});
