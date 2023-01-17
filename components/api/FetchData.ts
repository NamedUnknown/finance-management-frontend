import { getStatesRepresentation } from "../../common/statusCode";
import { RequestParams, getHeaders } from "../../model/requestParams";
import { ResponseParams } from "../../model/resposeParams";

export async function fetchDataFromAPI(params: RequestParams): Promise<ResponseParams> {
  let request: RequestInit = {};
  if (params.credentials != null) {
    const jwt: string = sessionStorage.getItem("jwt");

    params.headers = new Map<string,Object>();

    params.headers.set("Authorization", "Bearer " + jwt);
    params.headers.set("Content-Type", "application/json");
    params.headers.set("Access-Control-Allow-Credentials", true);

    request.credentials = "include";
  }

  request.method = params.method;
  request.body = JSON.stringify(params.body);
  request.headers = getHeaders(params.headers);
  request.mode = "cors";

  try {
    const response = await fetch(params.apiUrl, request);
    try {
      const parsedBody = await response.json();

      return {
        statusRep: getStatesRepresentation(response.status),
        headers: response.headers,
        body: parsedBody
      };
    } catch (e) {
      return {
        statusRep: getStatesRepresentation(response.status),
        headers: response.headers,
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}