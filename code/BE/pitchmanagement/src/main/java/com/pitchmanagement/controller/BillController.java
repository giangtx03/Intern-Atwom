package com.pitchmanagement.controller;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.dto.admin.BillDayDto;
import com.pitchmanagement.dto.admin.BillPitchDto;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/bill")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    public ResponseEntity<BaseResponse> addBill(@RequestBody BillRequest bill) {
        BillRequest myBill = billService.addBill(bill);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(myBill)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin/billday")
    public ResponseEntity<BaseResponse> getBillDayByMonth(@RequestParam  int month, @RequestParam int year) {
        List<BillDayDto> myBill = billService.getBillDayByMonth(month, year);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(myBill)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin/billpitch")
    public ResponseEntity<BaseResponse> getBillPitchByMonth(@RequestParam  int month, @RequestParam int year) {
        List<BillPitchDto> myBill = billService.getBillPitchByMonth(month, year);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED.value())
                .data(myBill)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
