package com.pitchmanagement.dao;

import com.pitchmanagement.dto.UserDto;
import com.pitchmanagement.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {
    void save(UserDto userDto);

    Map<String,Object> getUserByEmail(String email);

    boolean existingByEmail(String email);
}
