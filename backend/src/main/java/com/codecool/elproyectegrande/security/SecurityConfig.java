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
                //.addFilterBefore(new AuthenticationFilter(authenticationManager), BasicAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers("/","index","index.html","/static/css/**", "/static/js/**","/static/media/**","/public/**","/static/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/products/all","/clients/**", "/error").permitAll();
                    auth.requestMatchers(HttpMethod.POST,"/login","/clients", "/products").permitAll();
                    auth.requestMatchers(HttpMethod.GET,"/products/**").hasAnyAuthority("USER","ADMIN");
                    auth.anyRequest().authenticated();
                        }
                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }
}