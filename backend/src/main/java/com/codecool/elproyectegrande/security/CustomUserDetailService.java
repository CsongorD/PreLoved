package com.codecool.elproyectegrande.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.codecool.elproyectegrande.dao.ClientDAO;
import com.codecool.elproyectegrande.dao.model.Client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Custom implementation of UserDetailsService for Spring Security.
 * Loads user details from the database for authentication.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailService implements UserDetailsService {
    private final ClientDAO clientDAO;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user details for username: {}", username);
        final Client client  = clientDAO.findClientByClientName(username);
        if (client == null) {
            throw new UsernameNotFoundException(username + " not found.");
        }
        // Use the client's actual role from the database
        UserDetails user = User.withUsername(client.getClientName())
                               .password(client.getPassword())
                               .authorities(client.getRole().name()) // Use .name() for enum
                               .build();
        return user;
    }
}