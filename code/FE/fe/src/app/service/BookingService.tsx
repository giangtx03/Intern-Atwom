import axios from "axios";
import React, { Component } from "react";
import { HeadersUtil } from "../utils/HeaderUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { ApiUrlUtil } from "../utils/ApiUtil";
import Booking from "../model/Booking";

export class BookingService {
  private static _bookingService: BookingService;

  public static getInstance(): BookingService{
    if(!BookingService._bookingService){
        BookingService._bookingService = new BookingService();
    }
    return BookingService._bookingService;
  }

  public getLstBooking(modelSearch: any, id: number){
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString("http://localhost:8080" + `/booking/${id}`, params);
    return axios.get(url,{
        headers: HeadersUtil.getHeaders(),
    })
  }

  public CancelBooking(booking :Booking){
    const url = ApiUrlUtil.buildQueryString("http://localhost:8080" + `/booking`);
    return axios.put(url,booking,{
        headers: HeadersUtil.getHeaders(),
    })
  }

  public addBooking(booking: Booking){
    const url = "http://localhost:8080/booking";
    return axios.post(url,booking,{
        headers: HeadersUtil.getHeaders(),
    })
  }

  public total(modelSearch: any, id: number){
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString("http://localhost:8080" + `/booking/total/${id}`, params);
    return axios.get(url,{
        headers: HeadersUtil.getHeaders(),
    })
  }
}