package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.BookingDto;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.constant.*;
import lombok.RequiredArgsConstructor;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pitchmanagement.dao.BookingDAO;
import com.pitchmanagement.dao.CommentDAO;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.dto.PitchTimeDTO;
import com.github.pagehelper.PageHelper;
import com.pitchmanagement.model.request.BookingRequest;
import com.pitchmanagement.service.BookingService;

import jakarta.transaction.Transactional;

@Transactional(rollbackOn = Exception.class)
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingDAO bookingDAO;
    private final PitchTimeDAO pitchTimeDAO;

    @Override
    public List<PitchBookingDTO> SelectByUser(Integer user_id, String status, Integer offset, Integer limit,
            String order) {
        PageHelper.startPage(offset, limit);
        List<PitchBookingDTO> pitchBookings = bookingDAO.SelectByUser(user_id, "%" + status + "%", order);
        return pitchBookings;
    }

    public Integer total(Integer user_id, String status) {
        return bookingDAO.total(user_id, "%" + status + "%");
    }

    @Override
    public List<PitchBookingDTO> insert(BookingRequest bookingRequest) {
        List<PitchBookingDTO> check = bookingDAO.selectByUserAndPitchAndTime(bookingRequest.getUserId(),bookingRequest.getPitchId(),bookingRequest.getTimeSlotId());
        System.out.println(check);
        if (check.isEmpty()) {
            bookingDAO.insert(bookingRequest);
        }
        return check;
    }

    @Override
    public void update(BookingRequest bookingRequest) {
        PitchBookingDTO booking = bookingDAO.selectById(bookingRequest.getId());
        if (booking == null) {
            try {
                throw new NotFoundException("Không tìm thấy booking");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        bookingDAO.update(bookingRequest);
        System.out.println(booking.getStatus());
        if (booking.getStatus().equals(PitchBookingConstant.STATUS_PITCH_BOOKING_ACCESS)) {
            System.out.println(123);
            pitchTimeDAO.ChangeStatus(PitchTimeConstant.STATUS_PITCH_TIME_ACTIVE, bookingRequest.getPitchId(),
                    bookingRequest.getTimeSlotId());
        }
    }

    // ------------------------------------------------------------------
    @Override
    public List<ConfirmPitchBookingDto> getConfirmPitchBookingByStatus(String status) {
        System.out.println("Status: " + status);

        List<ConfirmPitchBookingDto> confirmPitchBookings = bookingDAO.selectConfirmPitchBookingByStatus(status);

        return bookingDAO.selectConfirmPitchBookingByStatus(status);
    }

    @Override
    public ConfirmPitchBookingDto updateStatusPitchBooking(Map<String, Object> statusMap) throws Exception {



        int id = (int) statusMap.get("id");
        String status = (String) statusMap.get("status");
        LocalDateTime localDateTime = (LocalDateTime) statusMap.put("updateAt", LocalDateTime.now());

        bookingDAO.updateStatusPitchBooking(statusMap);

        ConfirmPitchBookingDto tempConfirmPitchBookingDto = bookingDAO.selectConfirmPitchBookingById(id);

        if (tempConfirmPitchBookingDto == null) {
            throw new RuntimeException("ConfirmPitchBooking not found for id: " + id);
        }
        tempConfirmPitchBookingDto.setStatusBook(status);

        // Truy vấn bảng pitch_time
        BookingDto pitchBooking = bookingDAO.selectPitchBookingById(id);

        if (pitchBooking == null) {
            throw new RuntimeException("PitchBooking not found for id: " + id);
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

        // Nếu admin chấp nhận thì chuyển status thành "bận"
        if (status.equals(PitchBookingConstant.STATUS_PITCH_BOOKING_ACCESS)) {
            pitchTime.setStatus(PitchTimeConstant.STATUS_PITCH_TIME_NONACTIVE);
            pitchTimeDAO.updateStatusPitchTimeByIds(pitchTime);
        }

        return tempConfirmPitchBookingDto;
    }

    // ------------------------------------------------------------------
}