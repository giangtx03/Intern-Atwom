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

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/pitchtime")
public class PitchTimeController {

    private final PitchTimeService pitchTimeService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> GetPitchTime(@PathVariable("id") Integer id) {
        try {
            List<PitchTimeDTO> lst = pitchTimeService.FilterPitchByPitchId(id);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("success")
                    .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    //------------------------------------------------------------------
    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getPitchTimeAll(@RequestParam Long pitchId) {
        List<PitchTimeChildrenDto> pitchTimeChildrenDtos = pitchTimeService.getPitchTimeByPitchId(pitchId);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
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
                .status(HttpStatus.ACCEPTED.value())
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
                .status(HttpStatus.ACCEPTED.value())
                .data(pitchTime)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
