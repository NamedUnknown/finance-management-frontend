import { StatusRepresentation } from "../common/statusCode";

export interface ResponseParams {
  statusRep: StatusRepresentation;
  headers: Headers;
  body?: Object;
}