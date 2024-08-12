package com.pitchmanagement.security;

<<<<<<< HEAD
import com.pitchmanagement.dao.UserDao;
import com.pitchmanagement.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserDao userDao;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return CustomUserDetails.toCustomUser(User.toUser(userDao.getUserByEmail(username)));
    }
=======
public class CustomUserDetailsServiceImpl {
>>>>>>> 3392bdb00c301f4c71ae0eb16cd66461eb9e44b9
}
