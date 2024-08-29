package com.pitchmanagement.service.impl;

import com.pitchmanagement.constant.PitchBookingConstant;
import com.pitchmanagement.constant.PitchTimeConstant;
import com.pitchmanagement.dao.BillDao;
import com.pitchmanagement.dao.BookingDAO;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.admin.BookingDto;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.BillRequest;
import com.pitchmanagement.dto.admin.BillDayDto;
import com.pitchmanagement.dto.admin.BillPitchDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class BillServiceImpl implements BillService {

    private final BillDao billDao;
    private final BookingDAO bookingDAO;
    private final PitchTimeDAO pitchTimeDAO;

    @Override
    public BillRequest addBill(BillRequest bill) {

        bill.setCreateAt(LocalDateTime.now());

        Map<String, Object> updateStatusMap = new HashMap<>();
        updateStatusMap.put("id", bill.getPitchBookingId());
        updateStatusMap.put("status", PitchBookingConstant.STATUS_PITCH_BOOKING_SUCCESS);
        updateStatusMap.put("updateAt", bill.getCreateAt());

        bookingDAO.updateStatusPitchBooking(updateStatusMap);

        // Truy vấn bảng pitch_time
        BookingDto pitchBooking = bookingDAO.selectPitchBookingById(bill.getPitchBookingId());

        if (pitchBooking == null) {
            throw new RuntimeException("PitchBooking not found for id: " + bill.getPitchBookingId());
        }

        // tạo map để xác nhận sân đã đặt
        Map<String, Object> pitchTimeMap = new HashMap<>();
        pitchTimeMap.put("pitchId", pitchBooking.getPitchTimePitchId());
        pitchTimeMap.put("timeSlotId", pitchBooking.getPitchTimeTimeSlotId());

        PitchTimeRequest pitchTime = pitchTimeDAO.selectPitchTimeByIds(pitchTimeMap);

        if (pitchTime == null) {
            throw new RuntimeException("PitchTime not found for pitchId: " + pitchBooking.getPitchTimePitchId()
                    + " and timeSlotId: " + pitchBooking.getPitchTimeTimeSlotId()
                    + " Pitch Booking: " + pitchBooking);
        }
        // Chuyển status thành "rảnh"
        pitchTime.setStatus(PitchTimeConstant.STATUS_PITCH_TIME_ACTIVE);
        pitchTime.setPitchId(pitchBooking.getPitchTimePitchId());
        pitchTime.setTimeSlotId(pitchBooking.getPitchTimeTimeSlotId());
        pitchTimeDAO.updateStatusPitchTimeByIds(pitchTime);

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
