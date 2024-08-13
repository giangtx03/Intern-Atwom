package com.pitchmanagement.service;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.model.response.BillDayResponse;
import com.pitchmanagement.model.response.BillPitchResponse;

import java.util.List;
import java.util.Map;

public interface BillService {

    BillRequest addBill(BillRequest bill);

    List<BillDayResponse> getBillDayByMonth(int month, int year);

    List<BillPitchResponse> getBillPitchByMonth(int month, int year);
}
