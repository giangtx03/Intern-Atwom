package com.pitchmanagement.service.impl;

import java.util.List;

import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.service.PitchTimeService;

import jakarta.transaction.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class PitchTimeServiceImpl implements PitchTimeService {

    private final PitchTimeDAO pitchTimeDAO;

    @Override
    public List<PitchTimeDTO> FilterPitchByPitchId(Integer pitch_id) {
        List<PitchTimeDTO> pitchTime = pitchTimeDAO.FilterPitchByPitchId(pitch_id);
        return pitchTime;
    }

    @Override
    public List<PitchTimeChildrenDto> getPitchTimeByPitchId(Long pitchId) {
        return pitchTimeDAO.selectPictTimeByPitchId(pitchId);
    }

    @Override
    public PitchTimeRequest addPitchTime(PitchTimeRequest pitchTime) {

        pitchTime.setStatus("trong");

        pitchTimeDAO.insertPitchTime(pitchTime);

        return pitchTime;
    }
}
