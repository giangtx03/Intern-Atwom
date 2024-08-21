package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BookingDto {

    private int id;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String status;
    private int userId;
    private int pitchTimePitchId;
    private int pitchTimeTimeSlotId;
    private String note;
}
