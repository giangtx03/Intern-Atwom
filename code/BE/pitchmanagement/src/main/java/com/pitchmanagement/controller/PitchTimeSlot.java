package com.pitchmanagement.controller;

import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.model.request.PitchTypeRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchTimeService;
import com.pitchmanagement.service.PitchTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/pitchtime")
public class PitchTimeSlot {

    private final PitchTimeService pitchTimeService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    ResponseEntity<BaseResponse> addPitchTime(@RequestBody PitchTimeRequest pitchTimeRequest) {
        PitchTimeRequest pitchTime = pitchTimeService.addPitchTime(pitchTimeRequest);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(pitchTime)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
