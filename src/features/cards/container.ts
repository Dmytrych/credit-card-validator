import {asClass} from "awilix";
import { CardController } from "./card.controller";
import { CardValidator } from "./card-validator";

export const load = () => {
  return {
    cardController: asClass(CardController),
    cardValidator: asClass(CardValidator)
  }
}
