package com.codecool.elproyectegrande.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codecool.elproyectegrande.dao.model.Client;
import com.codecool.elproyectegrande.dto.request.CreateClientRequest;
import com.codecool.elproyectegrande.dto.response.ClientResponse;
import com.codecool.elproyectegrande.service.ClientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * REST controller for client-related operations.
 * Handles HTTP requests for client management.
 */
@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    /**
     * Retrieves all clients.
     *
     * @return list of client response DTOs
     */
    @GetMapping
    public ResponseEntity<List<ClientResponse>> getAllClients() {
        List<ClientResponse> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    /**
     * Retrieves a client by ID.
     *
     * @param id the client ID
     * @return the client response DTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable Long id) {
        ClientResponse client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    /**
     * Creates a new client.
     *
     * @param request the client creation request
     * @return the created client response DTO
     */
    @PostMapping
    public ResponseEntity<ClientResponse> createClient(@Valid @RequestBody CreateClientRequest request) {
        ClientResponse createdClient = clientService.createClient(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    /**
     * Updates an existing client.
     *
     * @param id the client ID
     * @param updatedClient the updated client data
     * @return success response
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateClientById(@PathVariable("id") Long id, @RequestBody Client updatedClient) {
        clientService.updateClientById(id, updatedClient);
        return ResponseEntity.ok().build();
    }

    /**
     * Deletes a client by ID.
     *
     * @param id the client ID
     * @return success response
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClientById(@PathVariable("id") Long id) {
        clientService.deleteClientById(id);
        return ResponseEntity.noContent().build();
    }

}