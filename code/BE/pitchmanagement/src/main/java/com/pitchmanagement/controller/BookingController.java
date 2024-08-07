package com.pitchmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @GetMapping("/{id}")
    public ResponseEntity<?> Get(@PathVariable("id") Integer user_id,@RequestParam("offset")Integer offset,@RequestParam("limit") Integer limit) {
        try {
            List<PitchBookingDTO> lst = bookingService.SelectByUser(user_id,offset,limit);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("success")
                    .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping
    public ResponseEntity<?> Update(@RequestBody BookingRequest bookingRequest) {
        try {
            bookingService.update(bookingRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("Tạo thành công")
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PostMapping
    public ResponseEntity<?> Booking(@RequestBody BookingRequest bookingRequest) {
        try{
            bookingService.insert(bookingRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("Cập nhật thành công")
                    .build();
                    return ResponseEntity.ok().body(response);
        }catch(Exception e){
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
       
    }
}
