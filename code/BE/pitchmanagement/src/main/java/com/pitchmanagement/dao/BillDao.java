package com.pitchmanagement.dao;

import com.pitchmanagement.model.Bill;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface BillDao {
    void insertBill(Bill bill);
}
