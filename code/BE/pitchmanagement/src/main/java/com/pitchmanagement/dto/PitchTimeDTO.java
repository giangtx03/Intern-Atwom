package com.pitchmanagement.dto;

import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PitchTimeDTO {
    private Double price;
    private String status;
    private Integer pitchId;
    private Integer timeSlotId;
    private Time startTime;
    private Time endTime;
    String name;
    String address;
    String namePitch;
}
