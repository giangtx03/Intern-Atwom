package com.pitchmanagement.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequest {

    @JsonProperty("email")
    @Email
    private String email;

    @JsonProperty("password")
    private String password;
}
