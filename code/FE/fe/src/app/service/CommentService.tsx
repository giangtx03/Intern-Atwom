import axios from "axios";
import React, { Component } from "react";
import { HeadersUtil } from "../utils/HeaderUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import Search from "../model/SearchModel";
import { ApiUrlUtil } from "../utils/ApiUtil";
import Comment from "../model/Comment";
import axiosCustom from "../config/interceptors/interceptors";

export default class CommentService {
  public static _commentService: CommentService;

  public static getInstance(): CommentService {
    if (!CommentService._commentService) {
      CommentService._commentService = new CommentService();
    }
    return CommentService._commentService;
  }

  public getLstPitchTime(
    modelSearch: Search,
    pitch_id?: number,
    order?: string
  ) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url =
      ApiUrlUtil.buildQueryString(
        process.env.REACT_APP_API_URL + `/comment/${pitch_id}`,
        params
      ) + `&order=${order ?? ""}`;
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getTotal(modelSearch: Search, pitch_id?: number) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/comment/total/${pitch_id}`,
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public AddComment(comment: Comment) {
    const url = ApiUrlUtil.buildQueryString(`/comment`);
    return axiosCustom.post(url, comment, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public Update(comment: Comment) {
    const url = ApiUrlUtil.buildQueryString(`/comment`);
    return axiosCustom.put(url, comment, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public DeleteComment(commentId?: number) {
    const url = ApiUrlUtil.buildQueryString(`/comment/${commentId}`);
    return axiosCustom.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
