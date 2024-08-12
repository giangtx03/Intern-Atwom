package com.pitchmanagement.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ConfirmPitchBookingDto {

    private int id;
    private String createAt;
    private String statusBook;
    private String namePitch;
    private String address;
    private String email;
    private String fullname;
    private String phoneNumber;
    private String startTime;
    private String endTime;
    private int price;

}
