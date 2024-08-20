import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUtil";
import { HeadersUtil } from "../utils/HeaderUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";

export class PitchService {
  private static _pitchService: PitchService;

  public static getInstance(): PitchService {
    if (!PitchService._pitchService) {
      PitchService._pitchService = new PitchService();
    }
    return PitchService._pitchService;
  }

  public getPitchById(id: number): any {
    const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + `/pitch/${id}`);
    const headers = HeadersUtil.getHeaders();
    return axios.get(url, {headers});
  }

  public getAllPitch(modelSearch: any): any {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + '/pitch', params);
    const headers = HeadersUtil.getHeaders();
    return axios.get(url, {headers});
  }
}
