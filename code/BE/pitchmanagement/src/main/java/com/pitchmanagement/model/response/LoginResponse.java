package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class LoginResponse extends UserResponse {

    @JsonProperty("token")
    private String token;

}
