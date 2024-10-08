package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.request.RegisterRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.LoginResponse;
import com.pitchmanagement.model.response.RegisterResponse;
import com.pitchmanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/users")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult result
    ) {
        try {
            if (result.hasErrors()) {
                // lấy ra danh sách lỗi
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                // trả về danh sách lỗi
                BaseResponse response = BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("Lỗi thông tin đầu vào!!!")
                        .data(errorMessages)
                        .build();
                return ResponseEntity.badRequest().body(response);
            }

            LoginResponse login = userService.login(loginRequest);

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.ACCEPTED.value())
                    .data(login)
                    .message("Đăng nhập thành công")
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest registerRequest,
            BindingResult result
    ) {
        try {
            if (result.hasErrors()) {
                // lấy ra danh sách lỗi
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                // trả về danh sách lỗi
                BaseResponse response = BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("Lỗi thông tin đầu vào!!!")
                        .data(errorMessages)
                        .build();
                return ResponseEntity.badRequest().body(response);
            }

            RegisterResponse register = userService.register(registerRequest);

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED.value())
                    .data(register)
                    .message("Đăng ký thành công")
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }
}
