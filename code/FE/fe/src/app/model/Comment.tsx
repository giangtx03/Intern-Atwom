import React, { Component } from 'react'

export default class Comment {
    id? :number;
    star?: number;
    content?: string;
    userId?: number;
    pitchId?: number;

    constructor(id?:any, star?:any, content?: any,userId?:number, pitchId?: number){
        this.id = id;
        this.star = star;
        this.content = content;
        this.userId = userId;
        this.pitchId = pitchId;
    }
}
