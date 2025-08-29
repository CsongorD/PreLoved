package com.codecool.elproyectegrande.dto.response;

import com.codecool.elproyectegrande.security.Role;
import lombok.Builder;
import lombok.Data;

/**
 * Response DTO for client information.
 * Excludes sensitive information like passwords.
 */
@Data
@Builder
public class ClientResponse {
    private Long id;
    private String clientName;
    private Role role;
}