package com.pitchmanagement.dao;

import java.util.*;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.model.request.BookingRequest;

@Mapper
public interface BookingDAO {
    PitchBookingDTO selectById(@Param("id") Integer id);

    List<PitchBookingDTO> SelectByUser(@Param("user_id") Integer user_id,@Param("status") String status);

    Integer total(@Param("user_id") Integer user_id, @Param("status") String status);

    void insert(BookingRequest pitchBooking);

    void update(BookingRequest pitchBooking);
}