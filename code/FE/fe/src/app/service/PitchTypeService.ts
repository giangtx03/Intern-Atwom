import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class PitchTypeService {
  private static _pitchTypeService: PitchTypeService;

  public static getInstance(): PitchTypeService {
    if (!PitchTypeService._pitchTypeService) {
      PitchTypeService._pitchTypeService = new PitchTypeService();
    }
    return PitchTypeService._pitchTypeService;
  }

  public getAllPitchType() {
    const headers = HeadersUtil.getHeaders();
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/pitch_type`);
    return axios.get(url, {headers})
  }
}
