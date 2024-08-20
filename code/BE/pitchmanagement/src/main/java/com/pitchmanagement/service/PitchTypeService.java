package com.pitchmanagement.service;

import com.pitchmanagement.dto.PitchTypeDto;
import com.pitchmanagement.model.request.PitchTypeRequest;
import com.pitchmanagement.model.response.PitchTypeResponse;

import java.util.List;

public interface PitchTypeService {

    List<PitchTypeRequest> getAll();

    List<PitchTypeResponse> getAllPitchType();
}
