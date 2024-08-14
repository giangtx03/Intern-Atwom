package com.pitchmanagement.service;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.dto.admin.BillDayDto;
import com.pitchmanagement.dto.admin.BillPitchDto;

import java.util.List;

public interface BillService {

    BillRequest addBill(BillRequest bill);

    List<BillDayDto> getBillDayByMonth(int month, int year);

    List<BillPitchDto> getBillPitchByMonth(int month, int year);
}
