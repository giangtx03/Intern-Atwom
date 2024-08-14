package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingDto {

    private Integer id;
    private String createAt;
    private String updateAt;
    private String status;
    private String note;
    private Integer pitchTimePitchId;
    private Integer pitchTimeTimeSlotId;
    private Integer userId;
}
