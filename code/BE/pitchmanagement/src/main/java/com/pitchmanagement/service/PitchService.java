package com.pitchmanagement.service;

import com.pitchmanagement.dto.admin.EditPitchRequestDto;
import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.EditPitchRequest;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.PageResponse;
import com.pitchmanagement.model.response.PitchResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PitchService {

    void addEditPitch(EditPitchRequestDto dto, List<MultipartFile> multipartFiles);

    void editEditPitch(EditPitchRequestDto dto, List<MultipartFile> multipartFiles);

    PitchRequest addPitch(PitchRequest pitchRequest);

    PitchRequest editPitch(PitchRequest pitchRequest);

    void delPitch(int id);

    PageResponse getPitchAll(Integer offset, Integer limit);

//    <!-- ...................Giang...................................... -->
    PitchResponse getPitchById(Long id) throws Exception;

    PageResponse getAllPitch(String keyword, Long pitchTypeId, Long timeSlotId, int pageNumber, int limit, String  sortBy, String sortOrder);
}
