package com.university.service;

import com.university.dto.LoginRequest;
import com.university.dto.LoginResponse;
import com.university.entity.User;
import com.university.repository.UserRepository;
import com.university.security.CustomUserDetailsService;
import com.university.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    public LoginResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        final User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        final String role = user.getRole().getName();
        final String jwt = jwtUtil.generateToken(userDetails, role);
        
        return new LoginResponse(jwt, role, user.getUsername(), user.getFullName());
    }
}
