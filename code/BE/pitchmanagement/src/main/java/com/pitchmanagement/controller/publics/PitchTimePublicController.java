package com.pitchmanagement.controller.publics;

import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.PitchTimeService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/pitch_time")
public class PitchTimePublicController {

    private final PitchTimeService pitchTimeService;

    @GetMapping("{id}")
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

}
