package com.pitchmanagement.controller;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.dto.admin.PitchDto;
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
                .status(HttpStatus.OK.value())
                .data(pitchRequest)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @PutMapping("/admin")
    ResponseEntity<BaseResponse> editPitch(@RequestBody PitchRequest request) {
        PitchRequest pitchRequest = pitchService.editPitch(request);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchRequest)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @DeleteMapping("/admin")
    ResponseEntity<BaseResponse> delPitch(@RequestParam int id) {
        pitchService.delPitch(id);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getPitchAll() {
        List<PitchDto> pitchDtos = pitchService.getPitchAll();
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchDtos)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
