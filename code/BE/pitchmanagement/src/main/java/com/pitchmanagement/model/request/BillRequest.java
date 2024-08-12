package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BillRequest {

    private Integer id;
    private LocalDateTime createAt;
    private String note;
    private Integer pitchBookingId;
}
