import { SQSEvent } from "aws-lambda";
import "reflect-metadata";
import { DeleteAccountController } from "src/controllers/deletePortadorController";
import "../containers/index";

export const handler = async (event: SQSEvent) => {
  console.log("EVENT", event);

  const deleteAccountController = new DeleteAccountController();
  const response = deleteAccountController.handler(event);

  return response;
};
