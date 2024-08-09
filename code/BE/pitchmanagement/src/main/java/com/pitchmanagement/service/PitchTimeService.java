package com.pitchmanagement.service;

import java.util.List;

import com.pitchmanagement.dto.PitchTimeDTO;

public interface PitchTimeService {
    List<PitchTimeDTO> FilterPitchByPitchId(Integer pitch_id);
}
