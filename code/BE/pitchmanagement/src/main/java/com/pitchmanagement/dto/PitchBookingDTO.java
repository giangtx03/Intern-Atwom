package com.pitchmanagement.dto;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

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
public class PitchBookingDTO {
    private Integer id;
    private LocalDateTime createAT;
    private LocalDateTime updateAt;
    private String status;
    private String note;
    private Integer userId;
    private Double price;
    private Integer pitchId;
    private Integer timeSlotId;
    private String pitchName;
    private String address;
    private String type;
    private Time startTime;
    private Time endTime;
}
