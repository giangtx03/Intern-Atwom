package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PitchTypeRequest {

    private Integer id;
    private String name;
}
