package com.pitchmanagement.dao;

import com.pitchmanagement.model.request.PitchRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PitchDao {

    void insertPitch(PitchRequest pitchRequest);
}
