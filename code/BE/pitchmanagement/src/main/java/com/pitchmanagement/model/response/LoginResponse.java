package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponse {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("email")
    private String email;
    @JsonProperty("fullname")
    private String fullname;
    @JsonProperty("token")
    private String token;
    @JsonProperty("create_at")
    private LocalDateTime createAt;
    @JsonProperty("update_at")
    private LocalDateTime updateAt;

}
