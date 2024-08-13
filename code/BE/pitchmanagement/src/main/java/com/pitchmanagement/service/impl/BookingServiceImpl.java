package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.BookingDto;
import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.model.request.PitchTimeRequest;
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
public class BookingServiceImpl implements BookingService {
    @Autowired
    BookingDAO bookingDAO;

    @Autowired
    PitchTimeDAO pitchTimeDAO;

    @Override
    public List<PitchBookingDTO> SelectByUser(Integer user_id,String status, Integer offset, Integer limit) {
        PageHelper.startPage(offset, limit);
        List<PitchBookingDTO> pitchBookings = bookingDAO.SelectByUser(user_id, "%" +status +"%");
        return pitchBookings;
    }

    public Integer total( Integer user_id,  String status){
        return bookingDAO.total(user_id,"%" +status +"%");
    }

    @Override
    public void insert(BookingRequest bookingRequest) {
        bookingDAO.insert(bookingRequest);
    }

    @Override
    public void update(BookingRequest bookingRequest) {
        bookingDAO.update(bookingRequest);
        PitchBookingDTO booking = bookingDAO.selectById(bookingRequest.getId());
        if (booking.getStatus() == "success") {
            pitchTimeDAO.ChangeStatus("ranh", bookingRequest.getPitchId(), bookingRequest.getTimeSlotId());            
        }
    }

    //------------------------------------------------------------------
    @Override
    public List<ConfirmPitchBookingDto> getConfirmPitchBookingByStatus(List<String> statuses) {
        System.out.println("Statuses: " + statuses);

        List<ConfirmPitchBookingDto> confirmPitchBookings = bookingDAO.selectConfirmPitchBookingByStatus(statuses);

//        // Định dạng trong sql
//        SimpleDateFormat originalFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy");
//
//        // Định dạng muốn hiển thị
//        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        SimpleDateFormat newFormatTime = new SimpleDateFormat("HH:mm:ss");
//
//        confirmPitchBookings.forEach(cpb -> {
//
//            // Kiểm tra định dạng xem đúng với định dạng mới chưa
//            try {
//                newFormat.parse(cpb.getCreateAt());
//                newFormatTime.parse(cpb.getStartTime());
//                newFormatTime.parse(cpb.getEndTime());
//            } catch (ParseException e) {
//                try {
//                    Date date = originalFormat.parse(cpb.getCreateAt());
//                    cpb.setCreateAt(newFormat.format(date));
//
//                    Date timeStart = originalFormat.parse(cpb.getStartTime());
//                    cpb.setStartTime(newFormatTime.format(timeStart));
//
//                    Date timeEnd = originalFormat.parse(cpb.getEndTime());
//                    cpb.setEndTime(newFormatTime.format(timeEnd));
//                } catch (ParseException ex) {
//                    ex.printStackTrace();
//                }
//            }
//        });

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

    //------------------------------------------------------------------
}
