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

@Transactional
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
    public List<ConfirmPitchBookingDto> getConfirmPitchBookingByStatus(List<String> statuses) {
        System.out.println("Statuses: " + statuses);

        List<ConfirmPitchBookingDto> confirmPitchBookings = bookingDAO.selectConfirmPitchBookingByStatus(statuses);

        return bookingDAO.selectConfirmPitchBookingByStatus(statuses);
    }

    @Override
    public ConfirmPitchBookingDto updateStatusPitchBooking(Map<String, Object> statusMap) {

        int id = (int) statusMap.get("id");
        String status = (String) statusMap.get("status");

        bookingDAO.updateStatusPitchBooking(statusMap);

        ConfirmPitchBookingDto tempConfirmPitchBookingDto = bookingDAO.selectConfirmPitchBookingById(id);
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

        System.out.println(" Pitch Booking: " + pitchBooking);
        if (pitchTime == null) {
            throw new RuntimeException("PitchTime not found for pitchId: " + pitchBooking.getPitchTimePitchId()
                    + " and timeSlotId: " + pitchBooking.getPitchTimeTimeSlotId()
                    + " Pitch Booking: " + pitchBooking);
        }

        // Nếu admin chấp nhận thì chuyển status thành "bận"
        if (status.equals("Chưa thanh toán")) {
            pitchTime.setStatus("ban");
            pitchTimeDAO.updateStatusPitchTimeByIds(pitchTime);
        }

        return tempConfirmPitchBookingDto;
    }

    // ------------------------------------------------------------------
}