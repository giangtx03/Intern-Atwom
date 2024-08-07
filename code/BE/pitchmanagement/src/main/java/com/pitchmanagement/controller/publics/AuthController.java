package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.response.BaseResponse;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/users")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult result
            ){
        try {
            if(result.hasErrors()){
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
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.ACCEPTED.value())
                    .message("hehe")
                    .build();
            return ResponseEntity.ok().body(response);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
