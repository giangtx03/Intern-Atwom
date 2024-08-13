import axios from "axios";
import React, { Component } from "react";
import { HeadersUtil } from "../utils/HeaderUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import Search from "../model/SearchModel";
import { ApiUrlUtil } from "../utils/ApiUtil";
import Comment from "../model/Comment";

export default class CommentService {
  public static _commentService: CommentService;

  public static getInstance(): CommentService {
    if (!CommentService._commentService) {
      CommentService._commentService = new CommentService();
    }
    return CommentService._commentService;
  }

  public getLstPitchTime(modelSearch: Search, pitch_id: number) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(
      "http://localhost:8080" + `/comment/${pitch_id}`,
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getTotal(pitch_id:number){
    const url = `http://localhost:8080/comment/total/${pitch_id}`;
    return axios.get(url,{
        headers: HeadersUtil.getHeaders(),
    })
  }

  public AddComment(comment: Comment) {
    const url = "http://localhost:8080/comment";
    return axios.post(url, comment, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public Update(comment: Comment){
    const url = "http://localhost:8080/comment";
    return axios.put(url,comment,{
        headers: HeadersUtil.getHeaders(),
    })
  }

  public DeleteComment(commentId: number){
    const url = `http://localhost:8080/comment/${commentId}`;
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
