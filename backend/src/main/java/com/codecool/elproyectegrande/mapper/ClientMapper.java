package com.codecool.elproyectegrande.mapper;

import com.codecool.elproyectegrande.dao.model.Client;
import com.codecool.elproyectegrande.dto.response.ClientResponse;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Client entities and DTOs.
 */
@Component
public class ClientMapper {
    
    /**
     * Converts a Client entity to a ClientResponse DTO.
     * Excludes sensitive information like passwords.
     *
     * @param client the client entity
     * @return the client response DTO
     */
    public ClientResponse toResponse(Client client) {
        if (client == null) {
            return null;
        }
        
        return ClientResponse.builder()
                .id(client.getId())
                .clientName(client.getClientName())
                .role(client.getRole())
                .build();
    }
}