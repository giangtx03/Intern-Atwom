package com.pitchmanagement.controllers;

import com.pitchmanagement.model.Bill;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admin/bill")
@RequiredArgsConstructor
public class BillController {

    @Autowired
    private final BillService billService;

    @PostMapping
    public ResponseEntity<BaseResponse> addBill(@RequestBody Bill bill) {
        Bill myBill = billService.addBill(bill);
        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.ACCEPTED)
                .data(myBill)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
