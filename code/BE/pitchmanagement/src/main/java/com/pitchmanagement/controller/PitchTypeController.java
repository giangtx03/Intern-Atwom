package com.pitchmanagement.controller;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.PitchTypeRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/pitchtype")
public class PitchTypeController {

    private final PitchTypeService pitchTypeService;

    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getPitchAll() {
        List<PitchTypeRequest> pitchAll = pitchTypeService.getAll();
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(pitchAll)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
