package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PitchTypeResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

}
