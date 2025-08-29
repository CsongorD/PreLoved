package com.codecool.elproyectegrande.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codecool.elproyectegrande.dao.ClientDAO;
import com.codecool.elproyectegrande.dao.model.Client;
import com.codecool.elproyectegrande.dto.request.CreateClientRequest;
import com.codecool.elproyectegrande.dto.response.ClientResponse;
import com.codecool.elproyectegrande.exception.BusinessLogicException;
import com.codecool.elproyectegrande.exception.ResourceNotFoundException;
import com.codecool.elproyectegrande.mapper.ClientMapper;
import com.codecool.elproyectegrande.security.Role;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service layer for client-related business operations.
 * Handles client creation, retrieval, updates, and deletion.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ClientService {

    private final ClientDAO clientDAO;
    private final PasswordEncoder passwordEncoder;
    private final ClientMapper clientMapper;

    /**
     * Retrieves all clients from the database.
     *
     * @return list of client response DTOs
     */
    @Transactional(readOnly = true)
    public List<ClientResponse> getAllClients() {
        log.debug("Retrieving all clients");
        return clientDAO.findAll().stream()
                .map(clientMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a client by their ID.
     *
     * @param id the client ID
     * @return the client response DTO
     * @throws ResourceNotFoundException if client is not found
     */
    @Transactional(readOnly = true)
    public ClientResponse getClientById(Long id) {
        log.debug("Retrieving client with id: {}", id);
        Client client = clientDAO.findClientById(id);
        if (client == null) {
            throw new ResourceNotFoundException("Client", id);
        }
        return clientMapper.toResponse(client);
    }

    /**
     * Creates a new client account.
     *
     * @param request the client creation request
     * @return the created client response DTO
     * @throws BusinessLogicException if client name already exists
     */
    @Transactional
    public ClientResponse createClient(CreateClientRequest request) {
        log.info("Creating new client with name: {}", request.getClientName());
        
        // Check if client name already exists
        if (clientDAO.findClientByClientName(request.getClientName()) != null) {
            throw new BusinessLogicException("Client name already exists: " + request.getClientName());
        }
        
        Client newClient = Client.builder()
                .clientName(request.getClientName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Set role directly as Role enum
                .build();
        
        Client savedClient = clientDAO.save(newClient);
        log.info("Successfully created client with id: {}", savedClient.getId());
        return clientMapper.toResponse(savedClient);
    }


    /**
     * Updates an existing client.
     *
     * @param id the client ID
     * @param updateClient the updated client data
     * @throws ResourceNotFoundException if client is not found
     */
    @Transactional
    public void updateClientById(Long id, Client updateClient) {
        log.info("Updating client with id: {}", id);
        Client currentClient = clientDAO.findClientById(id);
        if (currentClient == null) {
            throw new ResourceNotFoundException("Client", id);
        }
        
        if (updateClient.getClientName() != null) {
            currentClient.setClientName(updateClient.getClientName());
        }
        if (updateClient.getPassword() != null) {
            currentClient.setPassword(passwordEncoder.encode(updateClient.getPassword()));
        }
        
        clientDAO.save(currentClient);
        log.info("Successfully updated client with id: {}", id);
    }

    /**
     * Deletes a client by their ID.
     *
     * @param id the client ID
     * @throws ResourceNotFoundException if client is not found
     */
    @Transactional
    public void deleteClientById(Long id) {
        log.info("Deleting client with id: {}", id);
        if (!clientDAO.existsById(id)) {
            throw new ResourceNotFoundException("Client", id);
        }
        clientDAO.deleteById(id);
        log.info("Successfully deleted client with id: {}", id);
    }

}