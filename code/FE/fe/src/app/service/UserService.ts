import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/HeaderUtil";

export class UserService {
  private static _userService: UserService;

  public static getInstance(): UserService {
    if (!UserService._userService) {
      UserService._userService = new UserService();
    }
    return UserService._userService;
  }

  public login(modelLogin: any) {
    // console.log(process.env.REACT_APP_API_URL + '/login');
    const url = ApiUrlUtil.buildQueryString('http://localhost:8080/public/api/v1/users/login');
    const headers = HeadersUtil.getHeaders();
    return axios.post(url, modelLogin, {headers})
  }

  public register(modelRegister: any) {
    // console.log(process.env.REACT_APP_API_URL + '/login');
    const url = ApiUrlUtil.buildQueryString('http://localhost:8080/public/api/v1/users/register');
    const headers = HeadersUtil.getHeaders();
    return axios.post(url, modelRegister, {headers})
  }
}
