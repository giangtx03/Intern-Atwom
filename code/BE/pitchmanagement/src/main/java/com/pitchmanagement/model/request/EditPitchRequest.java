package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditPitchRequest {

    private Integer id;
    private String name;
    private String address;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Integer pitchTypeId;
    private List<PitchTimeRequest> pitchTimeRequests;
    private List<ImageRequest> imageRequests;
}
