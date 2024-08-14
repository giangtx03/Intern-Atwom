package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillPitchDto {
    private Integer id;
    private String namePitch;
    private Double totalPrice;
}
