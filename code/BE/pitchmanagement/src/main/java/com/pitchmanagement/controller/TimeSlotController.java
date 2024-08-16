package com.pitchmanagement.controller;

import java.util.List;

import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
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
@RequestMapping("${api.prefix}/pitchtime")
@RequiredArgsConstructor
public class TimeSlotController {

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
    ResponseEntity<BaseResponse> getPitchAll(@RequestParam int pitchId) {
        List<PitchTimeChildrenDto> pitchTimeChildrenDtos = pitchTimeService.getPitchTimeByPitchId(pitchId);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(pitchTimeChildrenDtos)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
