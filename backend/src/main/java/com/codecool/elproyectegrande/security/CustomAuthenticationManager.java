package com.codecool.elproyectegrande.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.codecool.elproyectegrande.dao.ClientDAO;

@Component
public class CustomAuthenticationManager implements AuthenticationManager {
    private ClientDAO clientDAO;
    private PasswordEncoder passwordEncoder;
    private CustomUserDetailService customUserDetailService;

    @Autowired
    public CustomAuthenticationManager(ClientDAO clientDAO, PasswordEncoder passwordEncoder, CustomUserDetailService customUserDetailService) {
        this.clientDAO = clientDAO;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails userDetails = customUserDetailService.loadUserByUsername(username);

        if (userDetails == null || !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new AuthenticationException("Invalid password") {};
        }
        return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
    }
}
