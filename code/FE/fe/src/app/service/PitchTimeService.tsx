import React, { Component } from 'react'
import { ApiUrlUtil } from '../utils/ApiUtil';
import axios from 'axios';
import { HeadersUtil } from '../utils/HeaderUtil';
import axiosCustom from '../config/interceptors/interceptors';

export default class PitchTimeService  {
    public static _pitchTimeService : PitchTimeService;

    public static getInstance(): PitchTimeService{
        if(!PitchTimeService._pitchTimeService){
            PitchTimeService._pitchTimeService = new PitchTimeService();
        }
        return PitchTimeService._pitchTimeService;
    }

    public getLstPitchTime(pitch_id:number){
        const url = ApiUrlUtil.buildQueryString(`/pitchtime/${pitch_id}`)
        return axiosCustom.get(url,{
            headers: HeadersUtil.getHeaders(),
        })
    }
}
