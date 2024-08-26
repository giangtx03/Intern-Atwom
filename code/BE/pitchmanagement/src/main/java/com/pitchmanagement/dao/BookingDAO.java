package com.pitchmanagement.dao;

import java.util.*;

import com.pitchmanagement.dto.admin.ConfirmPitchBookingDto;
import com.pitchmanagement.dto.admin.BookingDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.pitchmanagement.dto.PitchBookingDTO;
import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.model.request.BookingRequest;

@Mapper
public interface BookingDAO {
    PitchBookingDTO selectById(@Param("id") Integer id);

    List<PitchBookingDTO>  selectByUserAndPitchAndTime(@Param("user_id") Integer user_id, @Param("pitch_id") Integer pitch_id,
            @Param("time_slot_id") Integer time_slot_id);

    List<PitchBookingDTO> SelectByUser(@Param("user_id") Integer user_id, @Param("status") String status,
            @Param("order") String order);

    Integer total(@Param("user_id") Integer user_id, @Param("status") String status);

    List<PitchBookingDTO> SelectByUser(@Param("user_id") Integer user_id);

    void insert(BookingRequest pitchBooking);

    void update(BookingRequest pitchBooking);

    void RejectAllPitch(@Param("pitch_id") Integer pitchId,@Param("time_slot_id")Integer timeSlotId);

    // ------------------------------------------------------------------
    List<ConfirmPitchBookingDto> selectConfirmPitchBookingByStatus(Map<String, Object> params);

    BookingDto selectPitchBookingById(int id);

    ConfirmPitchBookingDto selectConfirmPitchBookingById(int id);

    void updateStatusPitchBooking(Map<String, Object> params);

    void updatePitchBookingToReject(Map<String, Object> params);


    // ------------------------------------------------------------------
}