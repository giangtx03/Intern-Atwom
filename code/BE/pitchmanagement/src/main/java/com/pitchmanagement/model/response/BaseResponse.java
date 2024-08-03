package com.pitchmanagement.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse {
    private HttpStatus status;
    private Object data;
    private String message;
}
