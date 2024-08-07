package com.pitchmanagement.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {
    private Integer id;
    private Date create_at;
    private String note;
    private Integer pitch_booking_id;
}
