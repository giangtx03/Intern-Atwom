package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.PitchTypeDao;
import com.pitchmanagement.model.request.PitchTypeRequest;
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
}
