package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TimeSlotRequest {
    private Integer id;
    private LocalTime startTime;
    private LocalTime endTime;
}
