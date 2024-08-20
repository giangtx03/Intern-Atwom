package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.PitchTypeDao;
import com.pitchmanagement.dto.PitchTypeDto;
import com.pitchmanagement.model.request.PitchTypeRequest;
import com.pitchmanagement.model.response.PitchTypeResponse;
import com.pitchmanagement.service.PitchTypeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class PitchTypeServiceImpl implements PitchTypeService {

    private final PitchTypeDao pitchTypeDao;

    @Override
    public List<PitchTypeRequest> getAll() {
        return pitchTypeDao.selectAll();
    }

    @Override
    public List<PitchTypeResponse> getAllPitchType() {
        return pitchTypeDao.getAll().stream()
                .map(pitchType -> PitchTypeResponse.builder()
                        .id(pitchType.getId())
                        .name(pitchType.getName())
                        .build()
                )
                .toList();
    }
}
