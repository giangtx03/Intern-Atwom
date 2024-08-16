package com.pitchmanagement.service;

import com.pitchmanagement.model.request.PitchTypeRequest;

import java.util.List;

public interface PitchTypeService {

    List<PitchTypeRequest> getAll();
}
