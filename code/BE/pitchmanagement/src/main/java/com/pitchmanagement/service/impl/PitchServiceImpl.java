package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.PitchDao;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PitchServiceImpl implements PitchService {

    private final PitchDao pitchDao;
    private final PitchTimeDAO pitchTimeDAO;

    @Override
    public PitchRequest addPitch(PitchRequest pitchRequest) {

        LocalDateTime localDateTime = LocalDateTime.now();
        pitchRequest.setCreateAt(localDateTime);

        pitchDao.insertPitch(pitchRequest);

        return pitchRequest;
    }

    @Override
    public List<PitchDto> getPitchAll() {
        return pitchDao.selectPitchAll();
    }
}
