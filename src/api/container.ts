import {asClass, asValue} from "awilix";
import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/types/logger";
import * as cardContainer from "../features/cards/container";
import { BinDataSource } from "./data-sources/bin.data-source";
import { getBinApiAxiosInstance } from "./axios";

export default (config: AppConfig, logger: ILogger) => {
  return {
    appConfig: asValue(config),
    logger: asValue(logger),
    binApiAxiosInstance: asValue(getBinApiAxiosInstance(config, logger)),
    binDataSource: asClass(BinDataSource),
    ...cardContainer.load()
  }
}
