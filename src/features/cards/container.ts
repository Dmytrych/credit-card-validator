import {asClass} from "awilix";
import { CardValidationController } from "./card.controller";

export const load = () => {
  return {
    cardValidationController: asClass(CardValidationController),
  }
}
