package com.pitchmanagement.service;

import com.pitchmanagement.model.request.TimeSlotRequest;
import com.pitchmanagement.model.response.TimeSlotResponse;

import java.util.List;

public interface TimeSlotService {

    List<TimeSlotRequest> getTimeSlotAll();
    List<TimeSlotResponse> getAll();

}
