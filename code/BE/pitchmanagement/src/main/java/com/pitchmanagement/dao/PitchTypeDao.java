package com.pitchmanagement.dao;

import com.pitchmanagement.dto.PitchTypeDto;
import com.pitchmanagement.model.request.PitchTypeRequest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PitchTypeDao {

    List<PitchTypeRequest> selectAll();

    List<PitchTypeDto> getAll();
}
