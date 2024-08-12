package com.pitchmanagement.dao;

import java.util.*;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.dto.admin.BookingDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.model.request.BookingRequest;

@Mapper
public interface BookingDAO {
    PitchBookingDTO selectById(@Param("id") Integer id);

    List<PitchBookingDTO> SelectByUser(@Param("user_id") Integer user_id);

    void insert(BookingRequest pitchBooking);

    void update(BookingRequest pitchBooking);

    //------------------------------------------------------------------
    List<ConfirmPitchBookingDto> selectConfirmPitchBookingByStatus(@Param("statuses") List<String> statuses);

    BookingDto selectPitchBookingById(int id);

    ConfirmPitchBookingDto selectConfirmPitchBookingById(int id);

    void updateStatusPitchBooking(Map<String, Object> params);

    //------------------------------------------------------------------
}