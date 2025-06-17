import {asValue} from "awilix";
import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/types/logger";
import * as cardContainer from "../features/cards/container";

export default (config: AppConfig, logger: ILogger) => {
  return {
    appConfig: asValue(config),
    logger: asValue(logger),
    ...cardContainer.load()
  }
}
