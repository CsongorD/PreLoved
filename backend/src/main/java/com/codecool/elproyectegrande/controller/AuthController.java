package com.codecool.elproyectegrande.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

import com.codecool.elproyectegrande.controller.dto.NewClientDTO;
import com.codecool.elproyectegrande.security.TokenService;

@RestController
@RequestMapping
public class AuthController {
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody NewClientDTO clientDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(clientDTO.clientName(), clientDTO.password()));
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