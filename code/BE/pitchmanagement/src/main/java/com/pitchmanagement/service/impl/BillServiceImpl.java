package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.BillDao;
import com.pitchmanagement.dao.PitchBookingDao;
import com.pitchmanagement.dao.PitchTimeDao;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.Bill;
import com.pitchmanagement.model.PitchTime;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    @Autowired
    private final BillDao billDao;

    @Autowired
    private final PitchBookingDao pitchBookingDao;

    @Autowired
    private final PitchTimeDao pitchTimeDao;

    @Override
    public Bill addBill(Bill bill) {

        ConfirmPitchBookingDto confirmPitchBookingDto = pitchBookingDao.selectConfirmPitchBookingById(bill.getPitchBookingId());

        // tạo map để xác nhận sân đã đặt
        Map<String, Object> PitchBookingMap = new HashMap<>();
        PitchBookingMap.put("id", confirmPitchBookingDto.getId());
        PitchBookingMap.put("status", "Đã thanh toán");

        pitchBookingDao.updateStatusPitchBooking(PitchBookingMap);


        billDao.insertBill(bill);

        return bill;
    }
}
