package com.pitchmanagement.service;

import com.pitchmanagement.model.request.ChangePasswordRequest;
import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.request.RegisterRequest;
import com.pitchmanagement.model.request.UpdateUserRequest;
import com.pitchmanagement.model.response.LoginResponse;
import com.pitchmanagement.model.response.RegisterResponse;
import com.pitchmanagement.model.response.UserResponse;

public interface UserService {

    LoginResponse login(LoginRequest loginRequest) throws Exception;

    RegisterResponse register(RegisterRequest request) throws Exception;

    UserResponse getUserById(Long id) throws Exception;
    UserResponse updateUser(UpdateUserRequest updateUserRequest) throws Exception;

    void changePassword(ChangePasswordRequest request) throws Exception;

}
