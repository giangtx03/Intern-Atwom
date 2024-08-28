package com.pitchmanagement.dao;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.EditPitchRequest;
import com.pitchmanagement.model.request.PitchRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface PitchDao {

    void insertEditPitch(EditPitchRequest editPitchRequest);

    void insertPitch(PitchRequest pitchRequest);

    void updateEditPitch(EditPitchRequest editPitchRequest);

    void updatePitch(PitchRequest pitchRequest);

    void deletePitch(int id);

    List<PitchDto> selectPitchAll();

    //    <!-- ...................Giang...................................... -->
    Map<String, Object> getPitchById(@Param("id") Long id);
    List<Map<String, Object>> getAllPitch( @Param("keyword") String keyword, @Param("pitchTypeId") Long pitchTypeId, @Param("timeSlotId") Long timeSlotId);
}
