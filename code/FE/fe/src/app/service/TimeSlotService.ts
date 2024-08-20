import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class TimeSlotService {
  private static _timeSlotService: TimeSlotService;

  public static getInstance(): TimeSlotService {
    if (!TimeSlotService._timeSlotService) {
      TimeSlotService._timeSlotService = new TimeSlotService();
    }
    return TimeSlotService._timeSlotService;
  }

  public getAllTimeSlot() {
    const headers = HeadersUtil.getHeaders();
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/time_slot`);
    return axios.get(url, {headers})
  }
}
