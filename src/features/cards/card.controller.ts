import {FastifyValidatedHandler} from "../../common/types/api";
import { CardValidationSchemaType } from "./card-validation.schema";

type CardControllerDependencies = {}

export class CardController {

  constructor(dependencies: CardControllerDependencies) {
  }

  validate: FastifyValidatedHandler<CardValidationSchemaType> = async (request, reply) => {

  }
}
