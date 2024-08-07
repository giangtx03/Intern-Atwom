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
    private LocalDateTime create_at;
    private LocalDateTime update_at;
    private String status;
    private String note;
    private Integer user_id;
    private Double price;
    private Integer pitch_id;
    private Integer time_slot_id;
    private String pitch_name;
    private String address;
    private String type;
    private Time start_time;
    private Time end_time;
}
