import "reflect-metadata";
import { container } from "tsyringe";
import { IPortadorRepository } from "@repositories/Repository/IPortadorRepository";
import { PortadorCreateUseCase } from "../portadorCreateUseCase";
import { AppError } from "src/errors/AppError";
import AWSMock from "aws-sdk-mock";

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
    findByCpf: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(portador)),
  };

  beforeEach(() => {
    container.clearInstances();
  });

  it("should be able to create a new portador", async () => {
    // @ts-ignore
    AWSMock.mock("SNS", "snsService", (params: any, callback: any) => {
      callback(null, "message");
    });

    const usecase = new PortadorCreateUseCase(createPortadorRepo);
    const response = await usecase.execute("42845684002", "teste teste");
    expect(response).toEqual(true);
  });

  it("should not be able to create Portador, if portador already exists ", async () => {
    const createPortadorRepo: jest.Mocked<IPortadorRepository> = {
      create: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      findByCpf: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      delete: jest.fn().mockImplementation(() => Promise.resolve(portador)),
    };
    const usecase = new PortadorCreateUseCase(createPortadorRepo);
    const mockError = new AppError("Portador already exists!");
    await expect(usecase.execute("42845684002", "teste teste")).rejects.toEqual(
      mockError
    );
  });

  it("should not be able to create Portador, if cpf invalid ", async () => {
    const createPortadorRepo: jest.Mocked<IPortadorRepository> = {
      create: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      findByCpf: jest.fn().mockImplementation(() => Promise.resolve(portador)),
      delete: jest.fn().mockImplementation(() => Promise.resolve(portador)),
    };
    const usecase = new PortadorCreateUseCase(createPortadorRepo);
    const mockError = new AppError("Cpf invalid!");
    await expect(usecase.execute("342342343", "teste teste")).rejects.toEqual(
      mockError
    );
  });
});
