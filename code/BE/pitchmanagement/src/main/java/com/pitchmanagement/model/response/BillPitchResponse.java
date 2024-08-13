package com.pitchmanagement.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillPitchResponse {
    private int id;
    private String namePitch;
    private double totalPrice;
}
