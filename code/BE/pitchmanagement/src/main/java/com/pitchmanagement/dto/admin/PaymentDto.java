package com.pitchmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class PaymentDto {

    private Integer id;
    private LocalDateTime createAt;
    private String note;
    private LocalDateTime dateTimeBook;
    private String namePitch;
    private String address;
    private String fullName;
    private String phoneNumber;
    private LocalTime startTime;
    private LocalTime endTime;
}
