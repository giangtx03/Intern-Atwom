package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.UserDao;
import com.pitchmanagement.dto.UserDto;
import com.pitchmanagement.model.User;
import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.request.RegisterRequest;
import com.pitchmanagement.model.response.LoginResponse;
import com.pitchmanagement.model.response.RegisterResponse;
import com.pitchmanagement.security.CustomUserDetails;
import com.pitchmanagement.service.UserService;
import com.pitchmanagement.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws Exception {

        Map<String, Object> src = userDao.getUserByEmail(loginRequest.getEmail());

        if(src == null || src.isEmpty()){
            throw new UsernameNotFoundException("Sai thông tin đăng nhập!!!");
        }

        User user = User.toUser(src);

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Sai thông tin đăng nhập!!!");
        }

        CustomUserDetails customUserDetails = CustomUserDetails.toCustomUser(user);

        String token = jwtUtil.generateToken(customUserDetails);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword(), customUserDetails.getAuthorities()
        );

        authenticationManager.authenticate(authenticationToken);

        return LoginResponse.builder()
                .email(user.getEmail())
                .fullname(user.getFullname())
                .token(token)
                .build();
    }

    @Override
    @Transactional(rollbackFor =  Exception.class)
    public RegisterResponse register(RegisterRequest request) throws Exception {

        if(userDao.existingByEmail(request.getEmail())){
            throw new UsernameNotFoundException("Email đã tồn tại!!!");
        }

        UserDto userDto = UserDto.builder()
                .email(request.getEmail())
                .fullname(request.getFullname())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();
        userDao.insert(userDto);

        return RegisterResponse.builder()
                .id(userDto.getId())
                .fullname(userDto.getFullname())
                .email(userDto.getEmail())
                .phoneNumber(userDto.getPhoneNumber())
                .address(userDto.getAddress())
                .role(userDto.getRole())
                .build();
    }


}
