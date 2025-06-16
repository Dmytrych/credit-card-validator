import {FastifyInstanceType} from "../../common/types/api";
import {injectionHandler} from "../../common/utils/container-utils";
import { CardController } from "./card.controller";
import { cardValidationSchema } from "./card-validation.schema";

export async function cardValidationRoutes(app: FastifyInstanceType) {
  app.post(
    '/validate',
    {
      schema: cardValidationSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<CardController>('cardController').validate
    )
  )
}
