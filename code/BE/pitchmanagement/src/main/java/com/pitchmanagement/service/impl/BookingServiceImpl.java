package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.List;

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
        if (bookingRequest.getStatus() == "success") {
            pitchTimeDAO.ChangeStatus("ranh", bookingRequest.getPitchId(), bookingRequest.getTimeSlotId());            
        }
    }
}
