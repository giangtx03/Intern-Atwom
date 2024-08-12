package com.pitchmanagement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pitchmanagement.dto.PitchTimeDTO;

@Mapper
public interface PitchTimeDAO {
    List<PitchTimeDTO> FilterPitchByPitchId(@Param("pitch_id") Integer pitch_id);

    PitchTimeDTO selectbyPitchAndTime(@Param("pitch_id") Integer pitch_id, @Param("time_id") Integer time_slot_id);

    void ChangeStatus(@Param("status") String status, @Param("pitch_id") Integer pitch_id,
            @Param("time_slot_id") Integer time_slot_id);
}
