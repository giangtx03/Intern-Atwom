package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.BookingDto;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.constant.*;
import com.pitchmanagement.model.response.PageResponse;
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
    public List<PitchBookingDTO> SelectByUser(Integer userId, String status, Integer offset, Integer limit,
            String order) {
        PageHelper.startPage(offset, limit);
        List<PitchBookingDTO> pitchBookings = bookingDAO.SelectByUser(userId, "%" + status + "%", order);
        return pitchBookings;
    }

    public Integer total(Integer userId, String status) {
        return bookingDAO.total(userId, "%" + status + "%");
    }

    @Override
    public List<PitchBookingDTO> insert(BookingRequest bookingRequest) {
        List<PitchBookingDTO> check = bookingDAO.selectByUserAndPitchAndTime(bookingRequest.getUserId(),bookingRequest.getPitchId(),bookingRequest.getTimeSlotId());
        if (check.isEmpty()) {
            bookingDAO.insert(bookingRequest);
            if(bookingRequest.getStatus().equals(PitchBookingConstant.STATUS_PITCH_BOOKING_ACCESS)){
                pitchTimeDAO.ChangeStatus(PitchTimeConstant.STATUS_PITCH_TIME_NONACTIVE, bookingRequest.getPitchId(), bookingRequest.getTimeSlotId());
                 bookingDAO.RejectAllPitch(bookingRequest.getPitchId(),bookingRequest.getTimeSlotId());
            }
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
            pitchTimeDAO.ChangeStatus(PitchTimeConstant.STATUS_PITCH_TIME_ACTIVE, bookingRequest.getPitchId(),
                    bookingRequest.getTimeSlotId());
        }
    }

    // ------------------------------------------------------------------
    @Override
    public PageResponse getConfirmPitchBookingByStatus(List<String> statuses , String namePitch, Integer offset, Integer limit) {

        Map<String, Object> params = new HashMap<>();
        params.put("statuses", statuses);
        params.put("namePitch", namePitch);

        // Kiểm tra nếu offset và limit là null hoặc không hợp lệ, thì lấy toàn bộ bản ghi
        List<ConfirmPitchBookingDto> pitchBookingDtos;
        if (offset == null || limit == null || offset < 0 || limit <= 0) {
            // Không phân trang, lấy tất cả bản ghi
            pitchBookingDtos = bookingDAO.selectConfirmPitchBookingByStatus(params);
        } else {
            // Sử dụng phân trang với PageHelper nếu có offset và limit
            PageHelper.offsetPage(offset, limit);
            pitchBookingDtos = bookingDAO.selectConfirmPitchBookingByStatus(params);
        }

        // Lấy tổng số bản ghi từ cơ sở dữ liệu
        long totalRecords = (limit != null && limit > 0) ? ((com.github.pagehelper.Page<?>) pitchBookingDtos).getTotal() : pitchBookingDtos.size();

        // Tính tổng số trang (nếu không phân trang thì tổng số trang là 1)
        int totalPages = (limit != null && limit > 0) ? (int) Math.ceil((double) totalRecords / limit) : 1;

        // Xây dựng và trả về đối tượng PageResponse
        return PageResponse.builder()
                .items(pitchBookingDtos)
                .totalItems(totalRecords)
                .totalPages(totalPages)
                .build();
    }


    @Override
    public ConfirmPitchBookingDto updateStatusPitchBooking(Map<String, Object> statusMap) throws Exception {

        int id = (int) statusMap.get("id");
        String status = (String) statusMap.get("status");
        statusMap.put("updateAt", LocalDateTime.now());

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
        // tạo map để từ chối các sân cùng ngày
        Map<String, Object> rejectPitch = new HashMap<>();

        rejectPitch.put("pitchTimePitchId", pitchBooking.getPitchTimePitchId());
        rejectPitch.put("pitchTimeTimeSlotId", pitchBooking.getPitchTimeTimeSlotId());
        rejectPitch.put("createAt", pitchBooking.getCreateAt().toLocalDate());

        bookingDAO.updatePitchBookingToReject(rejectPitch);
        bookingDAO.updateStatusPitchBooking(statusMap);


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