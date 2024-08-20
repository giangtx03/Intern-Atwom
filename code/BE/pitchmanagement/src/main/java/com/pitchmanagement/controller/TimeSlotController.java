package com.pitchmanagement.controller;

import java.util.List;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.TimeSlotRequest;
import com.pitchmanagement.service.TimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchTimeService;

@RestController
@RequestMapping("${api.prefix}/timeslot")
@RequiredArgsConstructor
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    //------------------------------------------------------------------
    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getTimeSlotAll() {
        List<TimeSlotRequest> timeSlotAll = timeSlotService.getTimeSlotAll();
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(timeSlotAll)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
