package com.pitchmanagement.controller;

import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/pitchtime")
public class PitchTimeController {

    private final PitchTimeService pitchTimeService;

    

    //------------------------------------------------------------------
    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getPitchTimeAll(@RequestParam Long pitchId) {
        List<PitchTimeChildrenDto> pitchTimeChildrenDtos = pitchTimeService.getPitchTimeByPitchId(pitchId);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchTimeChildrenDtos)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    ResponseEntity<BaseResponse> addPitchTime(@RequestBody PitchTimeRequest pitchTimeRequest) {
        PitchTimeRequest pitchTime = pitchTimeService.addPitchTime(pitchTimeRequest);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchTime)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @PutMapping("/admin")
    ResponseEntity<BaseResponse> editPitchTime(@RequestBody PitchTimeRequest pitchTimeRequest) {
        PitchTimeRequest pitchTime = pitchTimeService.editPitchTime(pitchTimeRequest);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchTime)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @DeleteMapping("/admin")
    ResponseEntity<BaseResponse> delPitchTime(@RequestParam int pitchId, @RequestParam int timeSlotId) {
        pitchTimeService.delPitchTime(pitchId, timeSlotId);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
