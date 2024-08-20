package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.PageResponse;
import com.pitchmanagement.model.response.PitchResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/pitch")
public class PitchPublicController {

    private final PitchService pitchService;

    @GetMapping
    public ResponseEntity<?> getAllPitch(
            @RequestParam("keyword") @Nullable String keyword,
            @RequestParam("pitch_type_id") @Nullable Long pitchTypeId,
            @RequestParam("time_slot_id") @Nullable Long timeSlotId,
            @RequestParam(name = "page_number",defaultValue = "1") int pageNumber,
            @RequestParam(name = "limit",defaultValue = "10") int limit,
            @RequestParam(name = "sort_by",defaultValue = "p.id") String sortBy,
            @RequestParam(name = "sort_order",defaultValue = "asc") String sortOrder) {
        try {

            PageResponse pageResponse = pitchService.getAllPitch(keyword, pitchTypeId,timeSlotId,pageNumber,limit, sortBy, sortOrder);

            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .data(pageResponse)
                    .message("Danh sách sân bóng !")
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
