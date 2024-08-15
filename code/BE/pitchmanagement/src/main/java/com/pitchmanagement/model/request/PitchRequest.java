package com.pitchmanagement.model.request;

import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

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
