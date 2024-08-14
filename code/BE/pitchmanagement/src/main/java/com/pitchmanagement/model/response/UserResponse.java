package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pitchmanagement.model.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class UserResponse {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("email")
    private String email;
    @JsonProperty("fullname")
    private String fullname;
    @JsonProperty("address")
    private String address;
    @JsonProperty("avatar")
    private String avatar;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("create_at")
    private LocalDateTime createAt;
    @JsonProperty("update_at")
    private LocalDateTime updateAt;
    @JsonProperty("role")
    private String role;

    public static UserResponse toUserResponse(Map<String, Object> src){
        return UserResponse.builder()
                .id(Long.parseLong(src.get("id").toString()))
                .email(src.get("email").toString())
                .fullname(src.get("fullname").toString())
                .address(src.get("address") != null ? src.get("address").toString() : "")
                .avatar(src.get("avatar") != null ? src.get("avatar").toString() : "")
                .phoneNumber(src.get("phoneNumber").toString())
                .createAt(src.get("createAt") != null ? LocalDateTime.parse(src.get("createAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .updateAt(src.get("updateAt") != null ? LocalDateTime.parse(src.get("updateAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .role(src.get("role").toString())
                .build();
    }
}
