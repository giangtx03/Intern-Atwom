package com.pitchmanagement.service;

import java.util.List;
import java.util.Map;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import org.springframework.stereotype.Service;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;

public interface BookingService {
    List<PitchBookingDTO> SelectByUser(Integer user_id,String status, Integer offset, Integer limit, String order);

    Integer total( Integer user_id,  String status);

    List<PitchBookingDTO> insert(BookingRequest bookingRequest);

    void update(BookingRequest bookingRequest);

    //------------------------------------------------------------------
    List<ConfirmPitchBookingDto> getConfirmPitchBookingByStatus(List<String> statuses);

    ConfirmPitchBookingDto updateStatusPitchBooking(Map<String, Object> params);
}
