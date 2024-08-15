package com.pitchmanagement.controller;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/pitch")
@RequiredArgsConstructor
public class PitchController {

    private final PitchService pitchService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    ResponseEntity<BaseResponse> addPitch(@RequestBody PitchRequest request) {
        PitchRequest pitchRequest = pitchService.addPitch(request);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(pitchRequest)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
