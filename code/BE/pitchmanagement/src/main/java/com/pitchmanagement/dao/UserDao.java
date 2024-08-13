package com.pitchmanagement.dao;

import com.pitchmanagement.dto.UserDto;
import com.pitchmanagement.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {
    void insert(UserDto userDto);
    void update(UserDto userDto);
    void changePassword(UserDto userDto);

    Map<String,Object> getUserByEmail(@Param("email") String email);

    boolean existingByEmail(@Param("email") String email);

    Map<String, Object> getUserById(@Param("id") Long id);


}
