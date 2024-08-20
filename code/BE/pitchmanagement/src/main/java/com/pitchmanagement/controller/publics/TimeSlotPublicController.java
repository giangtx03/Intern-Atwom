package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.TimeSlotResponse;
import com.pitchmanagement.model.response.UserResponse;
import com.pitchmanagement.service.TimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/time_slot")
public class TimeSlotPublicController {

    private final TimeSlotService timeSlotService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        try {
            List<TimeSlotResponse> timeSlotResponses = timeSlotService.getAll();

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .data(timeSlotResponses)
                    .message("Danh sách khung giờ !")
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
