package com.codecool.elproyectegrande.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Request DTO for creating a new client.
 */
@Data
public class CreateClientRequest {
    
    @NotBlank(message = "Client name is required")
    @Size(min = 3, max = 50, message = "Client name must be between 3 and 50 characters")
    private String clientName;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;
}