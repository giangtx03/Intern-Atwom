package com.pitchmanagement.dto.admin;

import lombok.Data;

@Data
public class EditPitchTimeRequestDto {
    private Integer price;
    private String status;
    private Integer timeSlotId;
}
