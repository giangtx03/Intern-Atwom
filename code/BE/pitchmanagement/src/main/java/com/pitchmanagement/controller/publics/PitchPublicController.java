package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.PitchResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/pitch")
public class PitchPublicController {

    private final PitchService pitchService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getPitchById(
            @PathVariable("id") Long pitchId) {
        try {
            PitchResponse pitchResponse = pitchService.getPitchById(pitchId);

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .data(pitchResponse)
                    .message("Thông tin sân bóng !")
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
