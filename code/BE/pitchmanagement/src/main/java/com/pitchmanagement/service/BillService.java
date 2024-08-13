package com.pitchmanagement.service;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.model.response.BillDayResponse;
import com.pitchmanagement.model.response.BillPitchResponse;

import java.util.List;

public interface BillService {

    BillRequest addBill(BillRequest bill);

    List<BillDayResponse> getBillDayByMonth(String yearMonth);

    List<BillPitchResponse> getBillPitchByMonth(String yearMonth);
}
