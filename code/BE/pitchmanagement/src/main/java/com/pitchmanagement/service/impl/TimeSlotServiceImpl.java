package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.TimeSlotDao;
import com.pitchmanagement.model.request.TimeSlotRequest;
import com.pitchmanagement.service.TimeSlotService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TimeSlotServiceImpl implements TimeSlotService {

    private final TimeSlotDao timeSlotDao;

    public List<TimeSlotRequest> getTimeSlotAll() {

        return timeSlotDao.selectTimeSlotAll();
    }

}
