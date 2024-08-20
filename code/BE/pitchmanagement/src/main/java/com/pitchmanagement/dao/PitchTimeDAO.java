package com.pitchmanagement.dao;

import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pitchmanagement.dto.PitchTimeDTO;

@Mapper
public interface PitchTimeDAO {
    List<PitchTimeDTO> FilterPitchByPitchId(@Param("pitch_id") Integer pitch_id);

    PitchTimeDTO selectbyPitchAndTime(@Param("pitch_id") Integer pitch_id, @Param("time_id") Integer time_slot_id);

    void ChangeStatus(@Param("status") String status, @Param("pitch_id") Integer pitch_id,
            @Param("time_slot_id") Integer time_slot_id);

    //------------------------------------------------------------------
    void insertPitchTime(PitchTimeRequest pitchTime);

    void updateStatusPitchTimeByIds(PitchTimeRequest pitchTime);

    void updatePricePitchTimeByIds(PitchTimeRequest pitchTime);

    void deletePitchTime(Map<String, Object> params);

    PitchTimeRequest selectPitchTimeByIds(Map<String, Object> params);

    List<PitchTimeChildrenDto> selectPictTimeByPitchId(Long pitchId);

    //------------------------------------------------------------------
}
