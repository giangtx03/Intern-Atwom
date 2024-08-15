package com.pitchmanagement.dao;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.PitchRequest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PitchDao {

    void insertPitch(PitchRequest pitchRequest);

    List<PitchDto> selectPitchAll();
}
