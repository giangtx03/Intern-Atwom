package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillDayDto {
    private Integer dayOfMonth;
    private Double totalPrice;
}
