import { ICRUDService } from "./crud-service.interface";
import { IApplication } from "../models";

export interface IApplicationService extends ICRUDService<IApplication> {}