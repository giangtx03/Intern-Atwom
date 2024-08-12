package com.pitchmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;

public interface BookingService {
    List<PitchBookingDTO> SelectByUser(Integer user_id, Integer offset, Integer limit);

    void insert(BookingRequest bookingRequest);

    void update(BookingRequest bookingRequest);
}