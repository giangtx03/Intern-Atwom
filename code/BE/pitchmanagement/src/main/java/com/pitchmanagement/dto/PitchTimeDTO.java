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
    private Integer pitch_id;
    private Integer time_slot_id;
    private Time start_time;
    private Time end_time;
    String name;
    String address;
    String name_pitch;
}
