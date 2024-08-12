package com.pitchmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private Long id;
    private String email;
    private String fullname;
    private String password;
    private String address;
    private String avatar;
    private String phoneNumber;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String role;

    public static User toUser(Map<String, Object> src){
        return User.builder()
                .id(Long.parseLong(src.get("id").toString()))
                .email(src.get("email").toString())
                .fullname(src.get("fullname").toString())
                .password(src.get("password").toString())
                .address(src.get("address") != null ? src.get("address").toString() : "")
                .avatar(src.get("avatar") != null ? src.get("avatar").toString() : "")
                .phoneNumber(src.get("phoneNumber").toString())
                .createAt(src.get("createAt") != null ? LocalDateTime.parse(src.get("createAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .updateAt(src.get("updateAt") != null ? LocalDateTime.parse(src.get("updateAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .role(src.get("role").toString())
                .build();
    }
}
