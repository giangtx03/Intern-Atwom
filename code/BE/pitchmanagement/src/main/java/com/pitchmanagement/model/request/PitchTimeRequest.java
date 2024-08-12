package com.pitchmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PitchTime {
    private int price;
    private String status;
    private int pitchId;
    private int timeSlotId;
}
