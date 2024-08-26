package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.UserDao;
import com.pitchmanagement.dto.UserDto;
import com.pitchmanagement.model.User;
import com.pitchmanagement.model.request.ChangePasswordRequest;
import com.pitchmanagement.model.request.LoginRequest;
import com.pitchmanagement.model.request.RegisterRequest;
import com.pitchmanagement.model.request.UpdateUserRequest;
import com.pitchmanagement.model.response.LoginResponse;
import com.pitchmanagement.model.response.RegisterResponse;
import com.pitchmanagement.model.response.UserResponse;
import com.pitchmanagement.security.CustomUserDetails;
import com.pitchmanagement.service.ImageService;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.InvalidPropertiesFormatException;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final ImageService imageService;

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

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword(), customUserDetails.getAuthorities()
        );

        authenticationManager.authenticate(authenticationToken);

        String token = jwtUtil.generateToken(user);
        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullname(user.getFullname())
                .avatar(user.getAvatar())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .token(token)
                .createAt(user.getCreateAt())
                .updateAt(user.getUpdateAt())
                .role(user.getRole())
                .build();
    }

    @Override
    @Transactional(rollbackFor =  Exception.class)
    public RegisterResponse register(RegisterRequest request) throws Exception {

        if(userDao.existingByEmail(request.getEmail())){
            throw new UsernameNotFoundException("Email đã tồn tại!!!");
        }

        if(!request.getPassword().trim().equals(request.getPassword())){
            throw new InvalidPropertiesFormatException("Mật khẩu chứa dấu cách ở đầu và cuối!!!");
        }

        UserDto userDto = UserDto.builder()
                .email(request.getEmail())
                .fullname(request.getFullname())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .role("USER")
                .build();
        userDao.insert(userDto);

        return RegisterResponse.builder()
                .id(userDto.getId())
                .fullname(userDto.getFullname())
                .email(userDto.getEmail())
                .phoneNumber(userDto.getPhoneNumber())
                .role(userDto.getRole())
                .createAt(userDto.getCreateAt())
                .updateAt(userDto.getUpdateAt())
                .build();
    }

    @Override
    public UserResponse getUserById(Long id) throws Exception {

        Map<String, Object> src = userDao.getUserById(id);

        if(src == null || src.isEmpty()){
            throw new UsernameNotFoundException("Người dùng không tồn tại!!!");
        }

        return UserResponse.toUserResponse(src);
    }

    @Override
    @Transactional(rollbackFor =  Exception.class)
    public UserResponse updateUser(UpdateUserRequest updateUserRequest) throws Exception {

        Map<String, Object> src = userDao.getUserById(updateUserRequest.getId());

        if(src == null || src.isEmpty()){
            throw new UsernameNotFoundException("Người dùng không tồn tại!!!");
        }

        String image = "";
        if(updateUserRequest.getAvatar() != null && !updateUserRequest.getAvatar().isEmpty()){
            if(src.get("avatar") != null && !src.get("avatar").toString().isEmpty()){
                imageService.delete(src.get("avatar").toString());
            }
            image = imageService.upload(updateUserRequest.getAvatar());
        }

        UserDto userDto = UserDto.builder()
                .id(updateUserRequest.getId())
                .address(updateUserRequest.getAddress() != null ? updateUserRequest.getAddress() : (src.get("address") != null ? src.get("address").toString() : ""))
                .fullname(updateUserRequest.getFullname() != null ? updateUserRequest.getFullname() : src.get("fullname").toString())
                .avatar(updateUserRequest.getAvatar() != null ? image : (src.get("avatar") != null ? src.get("avatar").toString() : ""))
                .phoneNumber(updateUserRequest.getPhoneNumber() != null ? updateUserRequest.getPhoneNumber() : src.get("phoneNumber").toString())
                .updateAt(LocalDateTime.now())
                .build();
        userDao.update(userDto);
        return UserResponse.builder()
                .id(userDto.getId())
                .email(src.get("email").toString())
                .fullname(userDto.getFullname())
                .address(userDto.getAddress())
                .avatar(userDto.getAvatar())
                .phoneNumber(userDto.getPhoneNumber())
                .createAt(src.get("createAt") != null ? LocalDateTime.parse(src.get("createAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .updateAt(userDto.getUpdateAt())
                .role(src.get("role").toString())
                .build();
    }

    @Override
    @Transactional(rollbackFor =  Exception.class)
    public void changePassword(ChangePasswordRequest request) throws Exception {
        Map<String, Object> src = userDao.getUserById(request.getUserId());

        if(src == null || src.isEmpty()){
            throw new UsernameNotFoundException("Người dùng không tồn tại!!!");
        }

        if(!request.getNewPassword().trim().equals(request.getNewPassword())){
            throw new InvalidPropertiesFormatException("Mật khẩu chứa dấu cách ở đầu và cuối!!!");
        }

        User user = User.toUser(src);

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            throw new BadCredentialsException("Mật khẩu không chính xác!!!");
        }

        UserDto userDto = UserDto.builder()
                .id(request.getUserId())
                .password(passwordEncoder.encode(request.getNewPassword()))
                .updateAt(LocalDateTime.now())
                .build();
        userDao.changePassword(userDto);
    }


}
