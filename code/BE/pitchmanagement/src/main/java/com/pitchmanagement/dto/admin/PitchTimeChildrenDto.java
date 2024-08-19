package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class PitchTimeChildrenDto {

    private LocalTime startTime;
    private LocalTime endTime;
    private Double price;
    private String status;
    private Integer idTime;
}
