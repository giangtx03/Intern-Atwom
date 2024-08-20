package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.PitchTypeResponse;
import com.pitchmanagement.model.response.TimeSlotResponse;
import com.pitchmanagement.service.PitchTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/pitch_type")
public class PitchTypePublicController {

    private final PitchTypeService pitchTypeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        try {
            List<PitchTypeResponse> pitchTypeResponses = pitchTypeService.getAllPitchType();

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .data(pitchTypeResponses)
                    .message("Danh sách loại sân bóng !")
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
