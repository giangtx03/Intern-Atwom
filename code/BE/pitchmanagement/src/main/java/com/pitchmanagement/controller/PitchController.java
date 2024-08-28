package com.pitchmanagement.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.dto.admin.EditPitchRequestDto;
import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.model.response.PageResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/pitch")
@RequiredArgsConstructor
public class PitchController {

    private final PitchService pitchService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping(value = "/admin/editpitch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> addEditPitch(
            @RequestParam("request") String requestJson, // Nhận chuỗi JSON
            @RequestParam(value = "multipartFiles", required = false) List<MultipartFile> multipartFiles) {

        // Chuyển đổi chuỗi JSON thành đối tượng EditPitchRequestDto
        ObjectMapper objectMapper = new ObjectMapper();
        EditPitchRequestDto request;
        try {
            request = objectMapper.readValue(requestJson, EditPitchRequestDto.class);
        } catch (JsonProcessingException e) {
            // Xử lý lỗi nếu không thể chuyển đổi chuỗi JSON
            BaseResponse errorResponse = BaseResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Invalid JSON format")
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Xử lý yêu cầu với request và multipartFiles
        pitchService.addEditPitch(request, multipartFiles);

        BaseResponse response = BaseResponse.builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

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
    @PutMapping(value = "/admin/editpitch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> editEditPitch(
            @RequestParam("request") String requestJson, // Nhận chuỗi JSON
            @RequestParam(value = "multipartFiles", required = false) List<MultipartFile> multipartFiles) {

        // Chuyển đổi chuỗi JSON thành đối tượng EditPitchRequestDto
        ObjectMapper objectMapper = new ObjectMapper();
        EditPitchRequestDto request;
        try {
            request = objectMapper.readValue(requestJson, EditPitchRequestDto.class);
        } catch (JsonProcessingException e) {
            // Xử lý lỗi nếu không thể chuyển đổi chuỗi JSON
            BaseResponse errorResponse = BaseResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Invalid JSON format")
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Xử lý yêu cầu với request và multipartFiles
        pitchService.editEditPitch(request, multipartFiles);

        BaseResponse response = BaseResponse.builder()
                .status(HttpStatus.OK.value())
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
    ResponseEntity<BaseResponse> getPitchAll(@RequestParam Integer offset, @RequestParam Integer limit) {
        PageResponse pitchDtos = pitchService.getPitchAll(offset, limit);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(pitchDtos)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
