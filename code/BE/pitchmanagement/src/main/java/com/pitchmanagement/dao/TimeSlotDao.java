package com.pitchmanagement.dao;

import com.pitchmanagement.dto.TimeSlotDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TimeSlotDao {

    List<TimeSlotDto> getAll();

}
