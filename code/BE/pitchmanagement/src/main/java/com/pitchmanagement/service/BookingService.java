package com.pitchmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;

public interface BookingService {
    List<PitchBookingDTO> SelectByUser(Integer user_id,String status, Integer offset, Integer limit);

    Integer total( Integer user_id,  String status);

    void insert(BookingRequest bookingRequest);

    void update(BookingRequest bookingRequest);
}