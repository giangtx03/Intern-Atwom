package com.pitchmanagement.controller;

import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.BookingService;
import com.pitchmanagement.service.CommentService;
import com.pitchmanagement.service.PitchTimeService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("${api.prefix}/booking")
@Validated
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PreAuthorize("ROLE_USER")
    @GetMapping("/{id}")
    public ResponseEntity<?> Get(
            @Min(value = 1, message = "pitch id must be greater than 0") @PathVariable("id") Integer user_id,
            @RequestParam(name = "keySearch", defaultValue = "", required = false) String search,
            @RequestParam(name= "order", defaultValue = "DESC", required = false) String order,
            @RequestParam(name = "page", defaultValue = "1", required = false) Integer offset,
            @RequestParam(name = "limit", defaultValue = "5", required = false) Integer limit) {
        try {
            List<PitchBookingDTO> lst = bookingService.SelectByUser(user_id,search, offset, limit,order);
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

    @PreAuthorize("ROLE_USER")
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
    @PreAuthorize("ROLE_USER")
    @PutMapping
    public ResponseEntity<?> Update(@Valid @RequestBody BookingRequest bookingRequest) {
        try {
            bookingService.update(bookingRequest);
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
    @PreAuthorize("ROLE_USER")
    @PostMapping
    public ResponseEntity<?> addBooking(@Valid @RequestBody BookingRequest bookingRequest) {
        try {
            List<PitchBookingDTO> check = bookingService.insert(bookingRequest);
            if(check.isEmpty()){
                BaseResponse response = BaseResponse.builder()
                        .status(HttpStatus.NO_CONTENT.value())
                        .message("Cập nhật thành công")
                        .build();
                return ResponseEntity.ok().body(response);
            }else{
                BaseResponse response = BaseResponse.builder()
                .status(HttpStatus.FOUND.value())
                .message("Bạn đã đặt thời gian trên")
                .build();
        return ResponseEntity.ok().body(response);
            }
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
    public ResponseEntity<BaseResponse> getConfirmPitchBookingByStatus(
            @RequestParam List<String> statuses,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer offset,
            @RequestParam(required = false) Integer limit) {

        PageResponse pageResponse = bookingService.getConfirmPitchBookingByStatus(statuses, search, offset, limit);

        BaseResponse response = BaseResponse.builder()
                .status(HttpStatus.OK.value())
                .data(pageResponse)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @PutMapping("/admin/confirm")
    ResponseEntity<BaseResponse> updateStatusPitchBooking(@RequestBody Map<String, Object> statusMap) throws Exception {
        ConfirmPitchBookingDto tempConfirmPitchBooking = bookingService.updateStatusPitchBooking(statusMap);

        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(tempConfirmPitchBooking)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    //------------------------------------------------------------------
}
