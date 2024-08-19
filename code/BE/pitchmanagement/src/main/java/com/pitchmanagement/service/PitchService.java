package com.pitchmanagement.service;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.ListResponse;
import com.pitchmanagement.model.response.PitchResponse;

import java.util.List;

public interface PitchService {

    PitchRequest addPitch(PitchRequest pitchRequest);

    PitchRequest editPitch(PitchRequest pitchRequest);

    List<PitchDto> getPitchAll();

//    <!-- ...................Giang...................................... -->
    PitchResponse getPitchById(Long id) throws Exception;

    ListResponse getAllPitch(String keyword, Long pitchTypeId, Long timeSlotId, int pageNumber, int limit, String  sortBy, String sortOrder);
}
