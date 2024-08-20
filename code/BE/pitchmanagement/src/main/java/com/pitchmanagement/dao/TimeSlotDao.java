package com.pitchmanagement.dao;

import com.pitchmanagement.model.request.TimeSlotRequest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TimeSlotDao {

    List<TimeSlotRequest> selectTimeSlotAll();
}
