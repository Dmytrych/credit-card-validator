import {asClass} from "awilix";
import { CardController } from "./card.controller";
import { CardValidator } from "./card-validation/card-validator";
import { BinValidator } from "./card-validation/bin-validator";

export const load = () => {
  return {
    cardController: asClass(CardController),
    cardValidator: asClass(CardValidator),
    binValidator: asClass(BinValidator)
  }
}
