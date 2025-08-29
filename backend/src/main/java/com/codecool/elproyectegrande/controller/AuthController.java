package com.codecool.elproyectegrande.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.codecool.elproyectegrande.dto.request.LoginRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Changed to HttpStatus
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codecool.elproyectegrande.security.TokenService;

/**
 * REST controller for authentication operations.
 * Handles user login and token generation.
 */
@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param loginRequest the login credentials
     * @return JWT token in Authorization header
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getClientName(), loginRequest.getPassword()));
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            List<String> roles = new ArrayList<>(authorities.size());
            for (GrantedAuthority authority : authorities) {
                roles.add(authority.getAuthority());
            }

            String token = tokenService.generateToken(authentication);

            return ResponseEntity.ok().header("Authorization", "Bearer " + token).build();

        } catch (UsernameNotFoundException exception){
            // Username not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found!");
        } catch (AuthenticationException exception){
            // Bad password or other authentication failure
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
        }
    }
}