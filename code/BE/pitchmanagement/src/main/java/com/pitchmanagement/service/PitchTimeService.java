package com.pitchmanagement.service;

import java.util.List;

import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchTimeRequest;

public interface PitchTimeService {
    List<PitchTimeDTO> FilterPitchByPitchId(Integer pitch_id);

    List<PitchTimeChildrenDto> getPitchTimeByPitchId(Long pitchId);

    PitchTimeRequest addPitchTime(PitchTimeRequest pitchTime);
}
