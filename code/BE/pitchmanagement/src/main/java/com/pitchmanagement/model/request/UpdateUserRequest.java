package com.pitchmanagement.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateUserRequest {

    private Long id;

    @NotBlank(message = "Fullname không được rỗng")
    private String fullname;

    @Size(min = 3, message = "Số điện thoại ít nhất 3 chữ số")
    private String phoneNumber;

    @Size(min = 8, message = "Mật khẩu ít nhất chứa 8 ký tự")
    private String password;

    private String address;

    private MultipartFile avatar;

}