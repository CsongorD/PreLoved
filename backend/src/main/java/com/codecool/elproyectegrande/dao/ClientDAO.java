package com.codecool.elproyectegrande.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codecool.elproyectegrande.dao.model.Client;

public interface ClientDAO extends JpaRepository<Client, Long> {

    Client findClientById(Long id);

    Client findClientByClientName(String clientName);
}
