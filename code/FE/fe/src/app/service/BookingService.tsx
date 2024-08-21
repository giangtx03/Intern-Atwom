import axios from "axios";
import React, { Component } from "react";
import { HeadersUtil } from "../utils/HeaderUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { ApiUrlUtil } from "../utils/ApiUtil";
import Booking from "../model/Booking";
import axiosCustom from "../config/interceptors/interceptors";

export class BookingService {
  private static _bookingService: BookingService;

  public static getInstance(): BookingService {
    if (!BookingService._bookingService) {
      BookingService._bookingService = new BookingService();
    }
    return BookingService._bookingService;
  }

  public getLstBooking(modelSearch: any, id?: number, order?: string) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(`/booking/${id}`, params) + `&order=${order}`;
    return axiosCustom.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public CancelBooking(booking: Booking) {
    const url = ApiUrlUtil.buildQueryString(`/booking`);
    return axiosCustom.put(url, booking, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public addBooking(booking: Booking) {
    const url = ApiUrlUtil.buildQueryString(`/booking`);
    return axiosCustom.post(url, booking, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public total(modelSearch: any, id?: number) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(`/booking/total/${id}`, params);
    return axiosCustom.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
