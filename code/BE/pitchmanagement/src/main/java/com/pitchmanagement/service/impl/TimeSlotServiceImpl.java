package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.TimeSlotDao;
import com.pitchmanagement.model.request.TimeSlotRequest;
import com.pitchmanagement.service.TimeSlotService;
import jakarta.transaction.Transactional;
import com.pitchmanagement.model.response.TimeSlotResponse;
import com.pitchmanagement.service.TimeSlotService;
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

    @Override
    public List<TimeSlotResponse> getAll() {
        return timeSlotDao.getAll()
                .stream()
                .map(time -> TimeSlotResponse.builder()
                        .id(time.getId())
                        .startTime(time.getStartTime())
                        .endTime(time.getEndTime())
                        .build()
                )
                .toList();
    }
}
