package com.pitchmanagement.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillDay {
    private int day;
    private double totalPrice;
}
