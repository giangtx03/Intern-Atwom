package com.pitchmanagement.service;

import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.request.RegisterRequest;
import com.pitchmanagement.model.response.LoginResponse;
import com.pitchmanagement.model.response.RegisterResponse;

public interface UserService {

    LoginResponse login(LoginRequest loginRequest) throws Exception;

    RegisterResponse register(RegisterRequest request) throws Exception;

}
