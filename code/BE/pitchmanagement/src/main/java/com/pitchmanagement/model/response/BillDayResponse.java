package com.pitchmanagement.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillDayResponse {
    private int dayOfMonth;
    private double totalPrice;
}
