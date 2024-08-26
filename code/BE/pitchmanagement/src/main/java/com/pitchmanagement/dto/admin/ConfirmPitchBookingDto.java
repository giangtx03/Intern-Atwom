package com.pitchmanagement.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ConfirmPitchBookingDto {

    private int id;
    private LocalDateTime createAt;
    private String statusBook;
    private String note;
    private String namePitch;
    private String address;
    private String email;
    private String fullname;
    private String phoneNumber;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double price;
    private LocalDateTime createBill;
    private String noteBill;

}
