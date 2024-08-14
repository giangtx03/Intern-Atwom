package com.pitchmanagement.dao;

import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.dto.admin.BillDayDto;
import com.pitchmanagement.dto.admin.BillPitchDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BillDao {
    void insertBill(BillRequest bill);

    List<BillDayDto> selectBillDayByMonth(Map<String, Object> params);

    List<BillPitchDto> selectBillPitchByMonth(Map<String, Object> params);
}
