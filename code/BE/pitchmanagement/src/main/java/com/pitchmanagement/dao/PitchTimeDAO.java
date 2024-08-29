package com.pitchmanagement.dao;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pitchmanagement.dto.PitchTimeDTO;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PitchTimeDAO {
    List<PitchTimeDTO> FilterPitchByPitchId(@Param("pitch_id") Integer pitch_id, @Param("startTime")LocalTime startTime);

    PitchTimeDTO selectbyPitchAndTime(@Param("pitch_id") Integer pitch_id, @Param("time_id") Integer time_slot_id);

    void ChangeStatus(@Param("status") String status, @Param("pitch_id") Integer pitch_id,
            @Param("time_slot_id") Integer time_slot_id);

    //------------------------------------------------------------------
    void insertPitchTime(PitchTimeRequest pitchTime);

    void updateStatusPitchTimeByIds(PitchTimeRequest pitchTime);

    void updatePricePitchTimeByIds(PitchTimeRequest pitchTime);

    void deletePitchTime(Map<String, Object> params);

    @Delete("<script>"
            + "DELETE FROM pitch_time WHERE pitch_id = #{pitchId} "
            + "<if test='timeSlotIds != null and !timeSlotIds.isEmpty()'>"
            + "AND time_slot_id NOT IN "
            + "<foreach item='id' collection='timeSlotIds' open='(' separator=',' close=')'>"
            + "#{id}"
            + "</foreach>"
            + "</if>"
            + "</script>")
    void deleteByPitchIdAndNotIn(@Param("pitchId") Integer pitchId, @Param("timeSlotIds") List<Integer> timeSlotIds);

    @Select("SELECT COUNT(*) FROM pitch_time WHERE pitch_id = #{pitchId} AND time_slot_id = #{timeSlotId}")
    int countByPitchIdAndTimeSlotId(@Param("pitchId") Integer pitchId, @Param("timeSlotId") Integer timeSlotId);

    PitchTimeRequest selectPitchTimeByIds(Map<String, Object> params);

    List<PitchTimeChildrenDto> selectPictTimeByPitchId(Long pitchId);

    //------------------------------------------------------------------
}
