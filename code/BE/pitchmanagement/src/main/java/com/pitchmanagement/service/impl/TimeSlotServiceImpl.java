package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.TimeSlotDao;
import com.pitchmanagement.model.response.TimeSlotResponse;
import com.pitchmanagement.service.TimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeSlotServiceImpl implements TimeSlotService {

    private final TimeSlotDao timeSlotDao;

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
