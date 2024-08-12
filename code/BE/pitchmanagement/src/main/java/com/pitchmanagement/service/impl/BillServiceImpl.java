package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.BillDao;
import com.pitchmanagement.dao.BookingDAO;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    @Autowired
    private final BillDao billDao;

    @Autowired
    private final BookingDAO pitchBookingDao;

    @Autowired
    private final PitchTimeDAO pitchTimeDao;

    @Override
    public BillRequest addBill(BillRequest bill) {

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
