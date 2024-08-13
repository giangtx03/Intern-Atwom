package com.pitchmanagement.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillPitch {
    private int id;
    private String namePitch;
    private double totalPrice;
}
