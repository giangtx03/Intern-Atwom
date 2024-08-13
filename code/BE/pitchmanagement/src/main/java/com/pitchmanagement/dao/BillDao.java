package com.pitchmanagement.dao;

import com.pitchmanagement.model.request.BillRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BillDao {
    void insertBill(BillRequest bill);
}
