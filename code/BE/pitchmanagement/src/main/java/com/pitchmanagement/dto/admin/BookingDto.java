package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingDto {

    private int id;
    private String createAt;
    private String updateAt;
    private String status;
    private String note;
    private int pitchTimePitchId;
    private int pitchTimeTimeSlotId;
    private int userId;
}
