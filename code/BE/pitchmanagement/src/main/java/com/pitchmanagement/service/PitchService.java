package com.pitchmanagement.service;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.PitchRequest;

import java.util.List;

public interface PitchService {

    PitchRequest addPitch(PitchRequest pitchRequest);

    List<PitchDto> getPitchAll();
}
