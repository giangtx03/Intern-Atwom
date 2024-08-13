package com.pitchmanagement.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BillRequest {

    private int id;
    private String createAt;
    private String note;
    private int pitchBookingId;
}
