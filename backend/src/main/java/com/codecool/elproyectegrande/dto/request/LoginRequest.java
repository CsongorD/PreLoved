package com.codecool.elproyectegrande.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Request DTO for user login.
 */
@Data
public class LoginRequest {
    
    @NotBlank(message = "Client name is required")
    private String clientName;
    
    @NotBlank(message = "Password is required")
    private String password;
}