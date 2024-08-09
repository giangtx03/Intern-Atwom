package com.pitchmanagement.model.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BaseResponse {
    private int status;
    private Object data;
    private String message;
}
