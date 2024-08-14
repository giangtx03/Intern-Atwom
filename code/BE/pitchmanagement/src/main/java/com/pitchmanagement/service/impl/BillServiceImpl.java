package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.BillDao;
import com.pitchmanagement.dao.BookingDAO;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.dto.admin.BillDayDto;
import com.pitchmanagement.dto.admin.BillPitchDto;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
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

    @Override
    public List<BillDayDto> getBillDayByMonth(int month, int year) {

        Map<String, Object> yearMonth = new HashMap<>();
        yearMonth.put("month", month);
        yearMonth.put("year", year);

        if (billDao.selectBillDayByMonth(yearMonth) == null) {
            throw new RuntimeException("Not billDAO " +  billDao.selectBillDayByMonth(yearMonth));
        }

        return billDao.selectBillDayByMonth(yearMonth);
    }

    @Override
    public List<BillPitchDto> getBillPitchByMonth(int month, int year) {

        Map<String, Object> yearMonth = new HashMap<>();
        yearMonth.put("month", month);
        yearMonth.put("year", year);

        if (billDao.selectBillPitchByMonth(yearMonth) == null) {
            throw new RuntimeException("Not billDAO " +  billDao.selectBillPitchByMonth(yearMonth));
        }

        return billDao.selectBillPitchByMonth(yearMonth);
    }
}
