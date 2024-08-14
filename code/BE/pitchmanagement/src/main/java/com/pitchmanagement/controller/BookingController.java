package com.pitchmanagement.controller;

import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.BookingService;
import com.pitchmanagement.service.CommentService;
import com.pitchmanagement.service.PitchTimeService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("booking")
@CrossOrigin("http://localhost:3000")
@Validated
public class BookingController {

    @Autowired
    BookingService bookingService;

    @GetMapping("/{id}")
    public ResponseEntity<?> Get(
            @Min(value = 1, message = "pitch id must be greater than 0") @PathVariable("id") Integer user_id,
            @RequestParam(name = "keySearch", defaultValue = "", required = false) String search,
            @RequestParam(name = "page", defaultValue = "1", required = false) Integer offset,
            @RequestParam(name = "limit", defaultValue = "5", required = false) Integer limit) {
        try {
            List<PitchBookingDTO> lst = bookingService.SelectByUser(user_id,search, offset, limit);
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

    @GetMapping("/total/{id}")
    public ResponseEntity<?> total(
            @Min(value = 1, message = "pitch id must be greater than 0") @PathVariable("id") Integer user_id,
            @RequestParam(name = "keySearch", defaultValue = "", required = false) String search) {
        try {
            Integer lst = bookingService.total(user_id, search);
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

    @PutMapping
    public ResponseEntity<?> Update(@Valid @RequestBody BookingRequest bookingRequest) {
        try {
            bookingService.update(bookingRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.NO_CONTENT.value())
                    .message("Tạo thành công")
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

    @PostMapping
    public ResponseEntity<?> Booking(@Valid @RequestBody BookingRequest bookingRequest) {
        try {
            bookingService.insert(bookingRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.NO_CONTENT.value())
                    .message("Cập nhật thành công")
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
    @GetMapping("/admin/confirm")
    ResponseEntity<BaseResponse> getConfirmPitchBookingByStatus(@RequestParam List<String> status) {
        List<ConfirmPitchBookingDto> confirmPitchBookings = bookingService.getConfirmPitchBookingByStatus(status);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(confirmPitchBookings)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @PutMapping("/admin/confirm")
    ResponseEntity<BaseResponse> updateStatusPitchBooking(@RequestBody Map<String, Object> statusMap) {
        ConfirmPitchBookingDto tempConfirmPitchBooking = bookingService.updateStatusPitchBooking(statusMap);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(tempConfirmPitchBooking)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    //------------------------------------------------------------------
}
