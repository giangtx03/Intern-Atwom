package com.pitchmanagement.service;

import com.pitchmanagement.model.request.TimeSlotRequest;

import java.util.List;

public interface TimeSlotService {

    List<TimeSlotRequest> getTimeSlotAll();
}
