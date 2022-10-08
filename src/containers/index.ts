import { IPortadorRepository } from "@repositories/Repository/IPortadorRepository";
import { PortadorRepository } from "@repositories/Repository/PortadorRepository";
import { container } from "tsyringe";

container.registerSingleton<IPortadorRepository>(
  "PortadorRepository",
  PortadorRepository
);
