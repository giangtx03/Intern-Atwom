package com.pitchmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Bill {

    private int id;
    private String createAt;
    private String note;
    private int pitchBookingId;
}
