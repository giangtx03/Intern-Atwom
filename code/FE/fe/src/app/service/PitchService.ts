import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class PitchService {
  private static _pitchService: PitchService;

  public static getInstance(): PitchService {
    if (!PitchService._pitchService) {
      PitchService._pitchService = new PitchService();
    }
    return PitchService._pitchService;
  }

  public getPitchById(id: number): any {
    const url = ApiUrlUtil.buildQueryString(`http://localhost:8080/public/api/v1/pitch/${id}`);
    const headers = HeadersUtil.getHeaders();
    return axios.get(url, {headers});
  }

  public getAllPitch(): any {
    const url = ApiUrlUtil.buildQueryString(`http://localhost:8080/public/api/v1/pitch`);
    const headers = HeadersUtil.getHeaders();
    return axios.get(url, {headers});
  }
}
