package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PitchTimeRequest {

    private Integer price;
    private String status;
    private Integer pitchId;
    private Integer timeSlotId;
}
