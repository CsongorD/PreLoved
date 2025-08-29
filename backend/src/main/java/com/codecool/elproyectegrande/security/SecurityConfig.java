package com.codecool.elproyectegrande.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {
    private TokenService tokenService;
    private CustomUserDetailService customUserDetailService;

    @Autowired
    public SecurityConfig(TokenService tokenService, CustomUserDetailService customUserDetailService) {
        this.tokenService = tokenService;
        this.customUserDetailService = customUserDetailService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http.csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(new BearerTokenAuthenticatingFilter(tokenService, customUserDetailService), BasicAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> {
                    // Static resources and frontend - accessible to everyone
                    auth.requestMatchers("/", "/index.html", "/static/**", "/assets/**", "/favicon.ico", "/manifest.json", "/robots.txt").permitAll();
                    auth.requestMatchers("/css/**", "/js/**", "/images/**", "/fonts/**", "/media/**").permitAll();
                    
                    // Authentication endpoints - accessible to everyone
                    auth.requestMatchers(HttpMethod.POST, "/login", "/clients").permitAll();
                    
                    // Product viewing - accessible to everyone (without login)
                    auth.requestMatchers(HttpMethod.GET, "/products/all", "/products/available").permitAll();
                    
                    // Individual product viewing - requires USER or ADMIN role
                    auth.requestMatchers(HttpMethod.GET, "/products/**").hasAnyAuthority("USER", "ADMIN");
                    
                    // Product creation - requires USER or ADMIN role
                    auth.requestMatchers(HttpMethod.POST, "/products").hasAnyAuthority("USER", "ADMIN");
                    
                    // Product updates - requires USER or ADMIN role (business logic handles ownership)
                    auth.requestMatchers(HttpMethod.PUT, "/products/**").hasAnyAuthority("USER", "ADMIN");
                    
                    // Product deletion - requires USER or ADMIN role (business logic handles ownership/admin privileges)
                    auth.requestMatchers(HttpMethod.DELETE, "/products/**").hasAnyAuthority("USER", "ADMIN");
                    
                    // Client management - requires authentication
                    auth.requestMatchers("/clients/**").hasAnyAuthority("USER", "ADMIN");
                    
                    // Error pages - accessible to everyone
                    auth.requestMatchers("/error").permitAll();
                    
                    // All other requests require authentication
                    auth.anyRequest().authenticated();
                        }
                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }
}