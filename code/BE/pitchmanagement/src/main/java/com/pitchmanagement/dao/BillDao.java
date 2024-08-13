package com.pitchmanagement.dao;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.model.response.BillDayResponse;
import com.pitchmanagement.model.response.BillPitchResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BillDao {
    void insertBill(BillRequest bill);

    List<BillDayResponse> selectBillDayByMonth(Map<String, Object> params);

    List<BillPitchResponse> selectBillPitchByMonth(Map<String, Object> params);
}
