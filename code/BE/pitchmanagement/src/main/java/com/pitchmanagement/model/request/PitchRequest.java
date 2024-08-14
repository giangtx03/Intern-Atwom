package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PitchRequest {
    private Integer id;
    private String name;
    private String address;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Integer pitchTypeId;
}
