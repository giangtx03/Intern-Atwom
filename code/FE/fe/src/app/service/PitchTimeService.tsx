import React, { Component } from 'react'
import { ApiUrlUtil } from '../utils/ApiUtil';
import axios from 'axios';
import { HeadersUtil } from '../utils/HeaderUtil';

export default class PitchTimeService  {
    public static _pitchTimeService : PitchTimeService;

    public static getInstance(): PitchTimeService{
        if(!PitchTimeService._pitchTimeService){
            PitchTimeService._pitchTimeService = new PitchTimeService();
        }
        return PitchTimeService._pitchTimeService;
    }

    public getLstPitchTime(pitch_id:number){
        const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + `/pitch_time/${pitch_id}`)
        return axios.get(url,{
            headers: HeadersUtil.getHeaders(),
        })
    }
}
