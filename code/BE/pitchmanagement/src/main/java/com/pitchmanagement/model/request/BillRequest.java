package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillRequest {

    private int id;
    private String createAt;
    private String note;
    private int pitchBookingId;
}
